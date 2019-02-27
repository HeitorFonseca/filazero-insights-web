import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EventService } from '../../shared/services/event.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_URL: string = environment.API_URL;
  authentication = { isAuth: false, userName: '' };
  externalAuthData = { externalAccessToken: '', provider: '', userName: '' };

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  });

  constructor(private readonly _http: HttpClient) { }

  isAuth(): boolean {
    const currentUser = JSON.parse(localStorage.getItem('authorizationData'));

    if (currentUser && currentUser.token) {
      return true;
    }
    return false;
  }

  logOut(): void {
    localStorage.removeItem('authorizationData');
    this.authentication.isAuth = false;
    this.authentication.userName = '';
  }

  getToken(loginData: any): Observable<any> {
    const httpOptions = {
      headers: this.headers
    };

    return new Observable<any>(observer => {
      this._http.post(`${this.API_URL}token`, loginData, httpOptions)
        .subscribe((response: any) => {
          const authorizationData = {
            refreshToken: response.refresh_token,
            token: response.access_token,
            userName: response.userName
          };

          localStorage.setItem('authorizationData', JSON.stringify(authorizationData));

          this.authentication.isAuth = true;
          this.authentication.userName = loginData.userName;

          this.afterLogin()
            .subscribe();
          observer.next(response);
          observer.complete();
        },
        (error) => observer.error(error));
    });
  }

  login(loginData: any): any {
    const body = `client_id=${environment.CLIENT_ID}&grant_type=password&password=${loginData.password}&userName=${loginData.userName}`;
    return this.getToken(body);
  }

  refreshToken(): Observable<any> {
    const authData = JSON.parse(localStorage.getItem('authorizationData'));
    return new Observable<any>(observer => {
      if (authData && authData.refreshToken) {
        const token = authData.refreshToken;
        const clientId = environment.CLIENT_ID;
        const data = `grant_type=refresh_token&refresh_token=${token}&client_id=${clientId}`;

        localStorage.removeItem('authorizationData');

        this._http.post(`${this.API_URL}token`, data, { headers: this.headers })
          .subscribe((response: any) => {
            localStorage.setItem('authorizationData', JSON.stringify({
              refreshToken: response.refresh_token,
              token: response.access_token,
              userName: response.userName
            }));

            this.afterLogin()
              .subscribe();

            observer.next(response);
            observer.complete();
          },
          (error) => observer.error(error));
      } else {
        observer.complete();
      }
    });
  }

  validateEmail(data): Observable<any> {
    return this._http.post(`${this.API_URL}api/account/confirm`, data);
  }

  private afterLogin(): Observable<any> {
    return new Observable<any>(observer => {
      this._http.get(`${this.API_URL}api/me/profile`)
        .subscribe((response: any) => {
          const localStorageData: any = JSON.parse(localStorage.getItem('authorizationData'));
          const userData = response.user;

          userData.token = localStorageData.token;
          userData.userName = localStorageData.userName;

          if (localStorageData.refreshToken) {
            userData.refreshToken = localStorageData.refreshToken;
          }

          localStorage.setItem('authorizationData', JSON.stringify(userData));
          EventService.afterLogin.emit();
          observer.next(response);
          observer.complete();
        },
        (error) => observer.error(error));
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private _auth: AuthService, private _router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = window.location.href;

    const currentUser = JSON.parse(localStorage.getItem('authorizationData'));
    if (currentUser && currentUser.token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUser.token}`
          }
        });
    }

    return next.handle(request)
      .pipe(
        catchError((err: any): Observable<HttpEvent<any>> => {
          if (err.status === 401) {
            this._auth.logOut();
            // this._router.navigate(['/user/login']);
            return next.handle(request);
          }
          return next.handle(request);
        })
      );
  }
}

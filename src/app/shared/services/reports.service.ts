import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserPreferencesService } from './user-preferences.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  API_URL: string = environment.API_URL;

  private location;
  private provider;

  constructor(private http: HttpClient,
    private _userPreferencesService: UserPreferencesService) { 
    }

  getServicesResources(){
    this.retrieveInformation();
    return this.http.get(`${this.API_URL}api/providers/${this.provider.id}/locations/${this.location.id}/dashboard/servicesResources`);
  }

  getDataFromServer(params): Observable<any>{
    return this.http.get(`${this.API_URL}api/providers/${this.provider.id}/locations/${this.location.id}/dashboard/classMedia`,{params});
  }

  getDataPerformFromServer(params): Observable<any>{
    return this.http.get(`${this.API_URL}api/providers/${this.provider.id}/locations/${this.location.id}/dashboard/performTotal`,{params});
  }

  getDataPerformPerServiceFromServer(params): Observable<any>{
    return this.http.get(`${this.API_URL}api/providers/${this.provider.id}/locations/${this.location.id}/dashboard/performSrvc`,{params});
  }

  getDataAvgRateFromServer(params): Observable<any>{
    return this.http.get(`${this.API_URL}api/providers/${this.provider.id}/locations/${this.location.id}/dashboard/avgRate`,{params});
  }

  getDataRushHourFromServer(params): Observable<any>{
    return this.http.get(`${this.API_URL}api/providers/${this.provider.id}/locations/${this.location.id}/dashboard/rushHour`,{params});
  }

  getAttendancesFromServer(params): Observable<any>{
    return this.http.get(`${this.API_URL}api/providers/${this.provider.id}/locations/${this.location.id}/dashboard/attendances`,{params});
  }

  retrieveInformation(){
    this.location = this._userPreferencesService.get('current-location');
    this.provider = this._userPreferencesService.get('current-provider');
  }
}

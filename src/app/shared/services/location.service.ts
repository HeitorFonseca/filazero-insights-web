import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  API_URL: string = environment.API_URL;

  constructor(private readonly _http: HttpClient) { }

  getLocations(providerId): Observable<any> {
    return this._http.get(`${this.API_URL}api/providers/` + providerId + "/locations");
  }

}

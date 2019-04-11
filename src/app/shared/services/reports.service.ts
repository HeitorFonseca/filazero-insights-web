import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  API_URL: string = environment.API_URL;
  constructor(private http: HttpClient) { }

  getServicesResources(){
    return this.http.get(`${this.API_URL}api/providers/198/locations/278/servicesResources`);
  }

  getDataFromServer(params): Observable<any>{
    console.log("params=", params); 

    return this.http.get(`${this.API_URL}api/providers/198/locations/278/dashboard`,{params});
  }
}

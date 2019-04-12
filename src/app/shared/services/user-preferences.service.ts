import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserPreferencesService {

  constructor() { }

  private userPreferencesDefault = {
    'current-location': {},
    'current-provider': {}
  };

  getInformation(){
    var information = JSON.parse(localStorage.getItem('user-preferences')) || {};
    return information;
  }

  get(key){
    var currentUserPreferences = this.getInformation();
    return currentUserPreferences[key];
  }

  set(key,value){
    var userPreferences = this.getInformation();
    userPreferences[key] = value;
    localStorage.setItem('user-preferences',JSON.stringify(userPreferences));
  }

  clearValue(key){
    var userPreferences = this.getInformation();
    userPreferences[key] = undefined;
    localStorage.setItem('user-preferences',JSON.stringify(userPreferences));
  }
}

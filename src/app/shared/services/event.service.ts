import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  /* Eventos de Login */
  static afterLogin = new EventEmitter();

  constructor() { }
}

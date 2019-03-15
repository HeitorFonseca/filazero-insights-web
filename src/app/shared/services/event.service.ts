import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  static changeTitle = new EventEmitter<string>();

  /* Eventos de Login */
  static afterLogin = new EventEmitter();
  static loginModal = new EventEmitter<boolean>();

  constructor() { }
}

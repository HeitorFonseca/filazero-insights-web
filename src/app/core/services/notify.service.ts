import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TranslatorService } from './translator.service';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  constructor(
    private _snackBar: MatSnackBar,
    private _translator: TranslatorService
  ) { }

  rise(message: string, type: string, duration: number = 5000) {
    this._snackBar.open(message, type, {
      duration: duration,
    });
  }

  displayNotify(message: string, type?: string) {
    this._snackBar.open(message, type, {
      duration: 5000,
    });
  }

  displayNotity(message: any) {
    let msg = null;

    if ((message && !message.ok && message.error) || message.type === 'ERROR') {
      msg = this.error(message);
    }

    if (msg) {
      this._snackBar.open(msg.description, msg.type, {
        duration: 5000,
      });
    }
  }

  private error(message: any): any {
    let code;
    const msg = {
      description: '',
      type: ''
    };

    if (message.type === 'ERROR') {
      code = message.code;
    } else {
      code = message.error.error;
    }

    msg.description = this._translator.get(`messages.error.${code}`);
    msg.type = this._translator.get(`messages.error.err`);

    return msg;
  }
}

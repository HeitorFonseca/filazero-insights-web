import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { UserLogin } from './login.model';
import { AuthService } from '../../../core/services/auth.service';
import { NotifyService } from '../../../core/services/notify.service';
import { TranslatorService } from '../../../core/services/translator.service';
import { EventService } from '../../../shared/services/event.service';

@Component({
  selector: 'fz-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  hide = true;
  loginData: UserLogin = new UserLogin();
  @Input() isModalOpen = false;
  @Input() changeModalEvent: EventEmitter<any>;

  constructor(
    private readonly _authService: AuthService,
    private _router: Router,
    private _notify: NotifyService,
    private _translator: TranslatorService
  ) {
    EventService.changeTitle.emit('login');
  }

  ngOnInit() { }

  login(loginData): void {
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;
    this._authService.login(loginData)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(() => {
        if (this.isModalOpen) {
          EventService.loginModal.emit(true);
        } else {
          this._router.navigate(['/home']);
        }
      },
      (error) => {
        if (error && error.error) {
          const erro = this._translator.get(`messages.error.${error.error.error}`);
          this._notify.rise(erro, 'Erro');
        }
      });
  }

  changeModal(): void {
    this.changeModalEvent.emit();
  }
}

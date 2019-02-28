import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { EventService } from '../../shared/services/event.service';
import { Template } from '../../shared/models/template.model';

@Component({
  selector: 'fz-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  isMenuExpanded: boolean;
  logoFilazero = 'assets/images/logo/fz-logo-white.svg';
  logoRoute = '/home';
  template = new Template();
  user = undefined;

  constructor(
    private readonly _auth: AuthService,
    private readonly _router: Router,
  ) {

    this.getUserInfo();

    if (!this.user) {
      this.user = undefined;
    }

    EventService.afterLogin.subscribe(() => this.getUserInfo());
  }

  ngOnInit() {
    this.getUserInfo();
  }

  isAuth(): boolean {
    return this._auth.isAuth();
  }

  getUserInfo() {
    const userData = JSON.parse(localStorage.getItem('authorizationData'));

    if (userData) {
      this.user = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.userName
      };
    }
  }

  logOut(): void {
    this.user = undefined;
    this._auth.logOut();
    this._router.navigate(['/user/login']);
  }

  backRoute() {
    window.history.back();
  }

  menuToggle(): void {
    this.isMenuExpanded = !this.isMenuExpanded;
  }

}

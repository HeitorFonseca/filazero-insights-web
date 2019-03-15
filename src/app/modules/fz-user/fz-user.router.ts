import { Routes } from '@angular/router';
import { LoginComponent } from './login';
import { AuthorizedGuard } from '../../core/guards';

export const USER_ROUTES: Routes = [
  { path: '', redirectTo: 'login'},
  { path: 'login', component: LoginComponent, canActivate: [AuthorizedGuard] }
];

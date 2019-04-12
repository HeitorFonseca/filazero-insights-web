import { Routes } from '@angular/router';

import { HomeComponent } from './home/';
import { AuthGuard, AuthorizedGuard } from '../core/guards';

export const FILAZERO_ROUTES: Routes = [

  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent, canActivate: [AuthorizedGuard], pathMatch: 'full' },
  { path: 'user', loadChildren: './modules/fz-user/fz-user.module#FzUserModule' },
  { path: 'dashboard/:slug/location/:location', loadChildren: './modules/dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard] },

];

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FilazeroModule } from './modules';

import { FILAZERO_ROUTES } from './modules/filazero.router';

import { AuthService } from './core/services/auth.service';
import { AuthInterceptorService } from './core/services/auth-interceptor.service';
import { AuthorizedGuard, AuthGuard } from './core/guards';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FilazeroModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(FILAZERO_ROUTES, { scrollPositionRestoration: 'top' }),
    HttpClientModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    AuthorizedGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StarRatingModule } from 'angular-star-rating';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { FilazeroModule } from './modules';

import { FILAZERO_ROUTES } from './modules/filazero.router';

import { AuthService } from './core/services/auth.service';
import { AuthInterceptorService } from './core/services/auth-interceptor.service';
import { AuthorizedGuard, AuthGuard } from './core/guards';

import { HeaderComponent } from './layouts/';
import { MaterialModule } from './utils/material.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FilazeroModule,
    MaterialModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(FILAZERO_ROUTES, { scrollPositionRestoration: 'top' }),
    HttpClientModule,
    StarRatingModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ChartsModule
  ],
  exports: [
    MaterialModule
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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { FilazeroModule } from './modules';
import { ChartsModule } from 'ng2-charts';
import { FILAZERO_ROUTES } from './modules/filazero.router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FilazeroModule,
    ChartsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(FILAZERO_ROUTES, { scrollPositionRestoration: 'top' }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

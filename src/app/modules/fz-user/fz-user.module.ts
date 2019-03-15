import { NgModule } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login';
import { MaterialModule } from '../../utils/material.module';

import { USER_ROUTES } from './fz-user.router';


@NgModule({
  imports: [
    RouterModule,
    TranslateModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(USER_ROUTES),
  ],
  declarations: [
    LoginComponent,
  ],
  exports: [
    LoginComponent,
  ],
  providers: [
    {
      provide: MAT_DIALOG_DATA,
      useValue: {}
    }
  ]
})

export class FzUserModule { }

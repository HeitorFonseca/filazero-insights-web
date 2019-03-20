import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../../../utils/material.module';
import { CheckboxComponent } from './checkbox';

@NgModule({
  imports: [
    FormsModule,
    TranslateModule,
    CommonModule,
    MaterialModule
  ],
  declarations: [
    CheckboxComponent,
  ],
  exports: [
    CheckboxComponent
  ]
})
export class FilterModule { }

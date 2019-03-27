import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { ChartsModule } from 'ng2-charts';

import { PipesModule } from '../shared/pipes/pipes.module';
import { MaterialModule } from '../utils/material.module';
import { FilterModule } from '../core/fz-components/filter/filter.module';

import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    PipesModule,
    TranslateModule,
    MaterialModule,
    DragDropModule,
    NgbModule,
    FilterModule,
    ChartsModule
  ],
  declarations: [HomeComponent],
  exports: [
    FilterModule,
    ChartsModule
  ]
})
export class FilazeroModule { }

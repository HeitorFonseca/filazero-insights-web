import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { DASH_ROUTES } from './dashboard.router';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { MaterialModule } from '../../utils/material.module';
import { FilterModule } from '../../core/fz-components/filter/filter.module';

import { ReportsComponent } from './reports';
import { FilterReportsComponent } from './reports/filter-reports/filter-reports.component'

import { ChartsModule } from 'ng2-charts';


@NgModule({
  imports: [
    CommonModule,
    PipesModule,
    RouterModule.forChild(DASH_ROUTES),
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FilterModule,
    ChartsModule
  ],
  declarations: [
    ReportsComponent,
    FilterReportsComponent
  ],
  providers: []
})
export class DashboardModule { }

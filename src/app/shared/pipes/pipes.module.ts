import { FzCurrencyPipe } from './fz-currency.pipe';
import { TimezoneFormatPipe } from './timezone-format.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from './capitalize.pipe';
import { DateFormatPipe } from './date-format.pipe';
import { ImageDefaultPipe } from './image-default.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CapitalizePipe,
    DateFormatPipe,
    ImageDefaultPipe,
    TimezoneFormatPipe,
    FzCurrencyPipe
  ],
  exports: [
    CapitalizePipe,
    DateFormatPipe,
    ImageDefaultPipe,
    TimezoneFormatPipe,
    FzCurrencyPipe
  ]
})
export class PipesModule { }

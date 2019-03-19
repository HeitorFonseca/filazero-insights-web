import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment-timezone';

@Pipe({
  name: 'timezoneFormat'
})

export class TimezoneFormatPipe implements PipeTransform {
  transform(date: Date, value: String): string {
    if (date && value) {
      return moment(date).tz(value).format('YYYY-MM-DD HH:mm');
    }
  }
}

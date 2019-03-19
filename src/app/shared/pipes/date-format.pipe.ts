import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
moment.locale('pt-br');

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(date: Date, args?: any): string {
    return moment.utc(date).format(args);
  }
}

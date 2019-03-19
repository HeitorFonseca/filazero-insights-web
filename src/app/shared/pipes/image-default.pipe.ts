import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageDefault'
})
export class ImageDefaultPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}

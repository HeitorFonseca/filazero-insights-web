import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  constructor() { }

  toggleFilter(key: string, value: object, filter: any): void {
    const temp = filter[key];
    const id = temp.indexOf(value);

    if (id > -1) {
      temp.splice(id, 1);
    } else {
      temp.push(value);
    }
  }

}

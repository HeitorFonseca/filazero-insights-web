import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslatorService {
  private text: string;

  constructor(
    private _translate: TranslateService
  ) { }

  get(msg: string): any {
    this._translate.get(msg)
      .subscribe((res: string) => {
        this.text = res;
      });
    return this.text;
  }
}

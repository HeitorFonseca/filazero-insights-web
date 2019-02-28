import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  constructor(
    private _translate: TranslateService,
   ) {
    this._translate.setDefaultLang('pt');
   }

  title = 'app';

}

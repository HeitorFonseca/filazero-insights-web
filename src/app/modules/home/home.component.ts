import { Component, OnInit } from '@angular/core';
import { ProvidersService } from '../../shared/services/providers.service'
import { finalize } from '../../../../node_modules/rxjs/operators';

import { Providers } from '../../shared/models/providers.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  isLoading = false;
  providers: Array<Providers> = [];

  constructor(private readonly _providersService: ProvidersService) { }

  ngOnInit() {

    this._providersService.getProviders().pipe(finalize(() => this.isLoading = false))
    .subscribe((response) => {

      this.providers = response.providers;

    });

  }

  selectProvider(provider) {

    console.log(provider);
  }

}

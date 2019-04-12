import { Component, OnInit } from '@angular/core';
import { finalize } from '../../../../node_modules/rxjs/operators';

import { ProvidersService } from '../../shared/services/providers.service'
import { LocationService } from '../../shared/services/location.service'
import { Providers } from '../../shared/models/providers.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  isLoading = false;
  providers: Array<Providers> = [];

  constructor(
    private readonly _providersService: ProvidersService,
    private readonly _locationService: LocationService)
    { }

  ngOnInit() {

    this._providersService.getProviders().pipe(finalize(() => this.isLoading = false))
    .subscribe((response) => {

      this.providers = response.providers;

    });

  }

  selectProvider(provider) {

    this.isLoading = true;

    this._locationService.getLocations(provider.id).pipe(finalize(()=> this.isLoading = false))
    .subscribe((response) => {

      this.providers.find(a => a.id == provider.id).locations = response;


      // for (var i = 0; i < this.providers.length; i++) {
      //   if (this.providers[i].id == provider.id) {
      //     this.providers[i].locations = response;
      //   }
      // }
    });

    console.log(provider);
  }

}

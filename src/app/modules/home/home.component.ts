import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from '../../../../node_modules/rxjs/operators';

import { ProvidersService } from '../../shared/services/providers.service';
import { LocationService } from '../../shared/services/location.service';
import { UserPreferencesService } from '../../shared/services/user-preferences.service';
import { Providers } from '../../shared/models/providers.model';
import { Location } from '../../shared/models/location.model';

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
    private readonly _locationService: LocationService,
    private _userPreferencesService: UserPreferencesService,
    private router: Router)
    { }

  ngOnInit() {

    this._providersService.getProviders().pipe(finalize(() => this.isLoading = false))
    .subscribe((response) => {

      this.providers = response.providers;

    });

  }

  selectProvider(provider: Providers) {

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

  selectLocation(provider: Providers, location: Location){
    this._userPreferencesService.clearValue('current-location');
    this._userPreferencesService.clearValue('current-provider');
    //limpando antigos valores do objeto pois o reportservice estava retornando-os
    this._userPreferencesService.set('current-location',location);
    this._userPreferencesService.set('current-provider',provider);
    
    this.router.navigate(['./dashboard/'+ provider.slug + '/location/'+location.id]);
  }
}

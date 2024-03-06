import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.css',
})
export class ByRegionPageComponent {
  constructor(private countriesService: CountriesService) {}
  public countries: Country[] = [];

  searchByRegion(event: string) {
    console.log('Desde By Region Page - Event - Término: ', event);
    this.countriesService.searchRegion(event).subscribe((countries) => {
      console.log('Desde By Region Page - Subscribe', countries);
      this.countries = countries;
    });
  }
}

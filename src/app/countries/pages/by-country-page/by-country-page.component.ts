import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.css',
})
export class ByCountryPageComponent {
  constructor(private countriesService: CountriesService) {}
  public countries: Country[] = [];

  searchByCountry(event: string) {
    console.log('Desde By Country Page - Event - Término: ', event);
    this.countriesService.searchCountry(event).subscribe((countries) => {
      console.log('Desde By Country Page - Subscribe', countries);
      this.countries = countries;
    });
  }
}

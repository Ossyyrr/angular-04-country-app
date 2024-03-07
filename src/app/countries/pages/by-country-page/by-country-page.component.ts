import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.css',
})
export class ByCountryPageComponent implements OnInit {
  public initialTerm: string = '';

  constructor(private countriesService: CountriesService) {}
  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountry.countries;
    this.initialTerm = this.countriesService.cacheStore.byCountry.term;
  }
  public countries: Country[] = [];

  searchByCountry(event: string) {
    console.log('Desde By Country Page - Event - Término: ', event);
    this.countriesService.searchCountry(event).subscribe((countries) => {
      console.log('Desde By Country Page - Subscribe', countries);
      this.countries = countries;
    });
  }
}

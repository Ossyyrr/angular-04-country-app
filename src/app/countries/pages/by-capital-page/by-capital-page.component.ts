import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.css',
})
export class ByCapitalPageComponent {
  constructor(private countriesService: CountriesService) {}

  public countries: Country[] = [];

  searchByCapital(event: string) {
    console.log('Desde By Capital Page - Event - Término: ', event);
    this.countriesService.searchCapital(event).subscribe((countries) => {
      console.log('Desde By Capital Page - Subscribe', countries);
      this.countries = countries;
    });
  }
}

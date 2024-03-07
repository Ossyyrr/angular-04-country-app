import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.css',
})
export class ByCapitalPageComponent {
  constructor(private countriesService: CountriesService) {}

  public countries: Country[] = [];
  public isLoading: boolean = false;

  searchByCapital(event: string) {
    this.isLoading = true;

    console.log('Desde By Capital Page - Event - Término: ', event);
    this.countriesService.searchCapital(event).subscribe((countries) => {
      console.log('Desde By Capital Page - Subscribe', countries);
      this.countries = countries;
      this.isLoading = false;
    });
  }
}

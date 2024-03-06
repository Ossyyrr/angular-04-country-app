import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { catchError, of } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.css',
})
export class CountryPageComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private countriesService: CountriesService
  ) {}

  public country?: Country;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      console.log(id);
      this.searchCountryById(id);
    });
  }

  searchCountryById(id: string) {
    this.countriesService.searchCountryById(id).subscribe((country) => {
      if (!country) {
        this.router.navigateByUrl('');
        return;
      }
      this.country = country;
    });
  }
}

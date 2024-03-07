import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Country } from '../interfaces/country';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  constructor(private http: HttpClient) {
    this.LoadFromLocalStorange();
  }
  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountry: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  };

  private saveToLocalStorange() {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private LoadFromLocalStorange() {
    if (!localStorage.getItem('cacheStore')) return;
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore') || '{}');
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url).pipe(
      catchError((error) => of([])),
      delay(1000)
    );
  }

  searchCapital(term: string): Observable<Country[]> {
    return this.getCountriesRequest(`${this.apiUrl}/capital/${term}`).pipe(
      tap((countries) => {
        this.cacheStore.byCapital = { term, countries };
      }),
      tap(() => this.saveToLocalStorange())
    );
  }

  searchCountry(term: string): Observable<Country[]> {
    return this.getCountriesRequest(`${this.apiUrl}/name/${term}`).pipe(
      tap((countries) => {
        this.cacheStore.byCountry = { term, countries };
      }),
      tap(() => this.saveToLocalStorange())
    );
  }

  searchRegion(term: Region): Observable<Country[]> {
    return this.getCountriesRequest(`${this.apiUrl}/region/${term}`).pipe(
      tap((countries) => {
        this.cacheStore.byRegion = { region: term, countries };
      }),
      tap(() => this.saveToLocalStorange())
    );
  }

  searchCountryById(id: string): Observable<Country | null> {
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${id}`).pipe(
      map((countries) => countries[0] || null),
      catchError((error) => of(null))
    );
  }
}

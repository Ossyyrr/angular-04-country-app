import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  constructor(private http: HttpClient) {}
  private apiUrl: string = 'https://restcountries.com/v3.1';

  searchCapital(term: string): Observable<Country[]> {
    // Hasta que no me subscriba no se dispara el Observable
    return this.http
      .get<Country[]>(`${this.apiUrl}/capital/${term}`)
      .pipe(catchError((error) => of([]))); // Si hay error, devuelvo un array vacío
  }

  searchCountry(term: string): Observable<Country[]> {
    return this.http
      .get<Country[]>(`${this.apiUrl}/name/${term}`)
      .pipe(catchError((error) => of([])));
  }

  searchRegion(term: string): Observable<Country[]> {
    return this.http
      .get<Country[]>(`${this.apiUrl}/region/${term}`)
      .pipe(catchError((error) => of([])));
  }

  searchCountryById(id: string): Observable<Country | null> {
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${id}`).pipe(
      map((country) => country[0]),
      catchError((error) => of(null))
    );
  }
}

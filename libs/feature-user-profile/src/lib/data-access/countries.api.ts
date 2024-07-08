import { Observable, delay, of } from 'rxjs';
import { Country } from '../models/country.model';
import { Injectable } from '@angular/core';

export const getCountriesMock = (): Country[] => [
  {
    id: 1,
    name: 'Ukraine',
  },
  {
    id: 2,
    name: 'USA',
  },
  {
    id: 3,
    name: 'France',
  },
];

@Injectable({
  providedIn: 'root',
})
export class CountriesApi {
  public fetchCountries(): Observable<Country[]> {
    return of(getCountriesMock()).pipe(delay(1000));
  }
}

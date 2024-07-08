import { Injectable } from '@angular/core';
import { CreateUserRequest, UpdateUserRequest, User } from '../models';
import { Observable, delay, map, of } from 'rxjs';
import { getCountriesMock } from './countries.api';

const getUserMock = (id: User['id'] = 1): User => ({
  id,
  firstName: 'Bob',
  lastName: 'Marley',
  address: {
    addressLine1: '56 Hope Road',
    country: getCountriesMock()[2].id,
    zip: '18000',
  },
});

@Injectable({
  providedIn: 'root',
})
export class UsersApi {
  public createUser(payload: CreateUserRequest): Observable<void> {
    return of(payload).pipe(
      delay(1000),
      map(() => undefined),
    );
  }

  public getUserById(id: User['id']): Observable<User> {
    return of(getUserMock(id)).pipe(delay(1000));
  }

  public updateUser(payload: UpdateUserRequest): Observable<void> {
    return of(payload).pipe(
      delay(1000),
      map(() => undefined),
    );
  }
}

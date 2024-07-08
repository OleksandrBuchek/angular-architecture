import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { User, UserRole } from '../models';

const getMockUsers = (): User[] => {
  return [
    {
      id: '1',
      email: 'alice.smith@example.com',
      firstName: 'Alice',
      lastName: 'Smith',
      role: UserRole.Admin,
      startDate: '2021-01-15',
    },
    {
      id: '2',
      email: 'bob.johnson@test.com',
      firstName: 'Bob',
      lastName: 'Johnson',
      role: UserRole.Support,
      startDate: '2020-02-20',
    },
    {
      id: '3',
      email: 'charlie.williams@example.com',
      firstName: 'Charlie',
      lastName: 'Williams',
      role: UserRole.Developer,
      startDate: '2019-03-25',
    },
    {
      id: '4',
      email: 'diana.jones@mockmail.com',
      firstName: 'Diana',
      lastName: 'Jones',
      role: UserRole.Manager,
      startDate: '2022-04-30',
    },
    {
      id: '5',
      email: 'edward.brown@test.com',
      firstName: 'Edward',
      lastName: 'Brown',
      role: UserRole.Admin,
      startDate: '2018-05-05',
    },
    {
      id: '6',
      email: 'fiona.davis@example.com',
      firstName: 'Fiona',
      lastName: 'Davis',
      role: UserRole.Support,
      startDate: '2023-06-10',
    },
    {
      id: '7',
      email: 'george.miller@mockmail.com',
      firstName: 'George',
      lastName: 'Miller',
      role: UserRole.Developer,
      startDate: '2017-07-15',
    },
    {
      id: '8',
      email: 'hannah.wilson@example.com',
      firstName: 'Hannah',
      lastName: 'Wilson',
      role: UserRole.Manager,
      startDate: '2021-08-20',
    },
    {
      id: '9',
      email: 'ivan.moore@test.com',
      firstName: 'Ivan',
      lastName: 'Moore',
      role: UserRole.Admin,
      startDate: '2016-09-25',
    },
    {
      id: '10',
      email: 'julia.taylor@mockmail.com',
      firstName: 'Julia',
      lastName: 'Taylor',
      role: UserRole.Support,
      startDate: '2020-10-30',
    },
  ];
};

@Injectable({
  providedIn: 'root',
})
export class UsersApi {
  public fetchUsers(): Observable<User[]> {
    return of(getMockUsers()).pipe(delay(1000));
  }
}

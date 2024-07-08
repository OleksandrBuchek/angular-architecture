import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { UserRole } from '../models';
import { objectKeys } from '@shared/util-object';

const getMockUserRoles = (): UserRole[] => objectKeys(UserRole);

@Injectable({
  providedIn: 'root',
})
export class RolesApi {
  public fetchRoles(): Observable<UserRole[]> {
    return of(getMockUserRoles()).pipe(delay(1000));
  }
}

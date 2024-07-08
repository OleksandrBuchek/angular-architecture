import { Injectable, inject } from '@angular/core';
import { UsersListRepository } from './users-list.repo';
import { RolesApi, UsersApi } from '../data-access';
import { fetchEntities } from '@shared/util-rxjs-interop';

@Injectable()
export class UsersListEffects {
  private readonly repo = inject(UsersListRepository);

  private readonly usersApi = inject(UsersApi);
  private readonly rolesApi = inject(RolesApi);

  public readonly fetchTableData = fetchEntities({
    requestFn: () => this.usersApi.fetchUsers(),
    store: this.repo.usersTableStore,
  });

  public readonly fetchRoles = fetchEntities({
    requestFn: () => this.rolesApi.fetchRoles(),
    store: this.repo.rolesStore,
    once: true,
  });
}

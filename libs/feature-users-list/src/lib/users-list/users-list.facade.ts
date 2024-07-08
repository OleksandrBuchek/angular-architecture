import { Provider, inject } from '@angular/core';
import { createInjectionToken } from '@shared/util-di';
import {
  UsersListEffects,
  UsersListRepository,
  provideUsersListStore,
} from './store';
import { Router } from '@angular/router';
import { TableFacadeFeature } from '@shared/util-facade';

export const UsersListFacade = createInjectionToken(
  (
    effects: UsersListEffects = inject(UsersListEffects),
    repo: UsersListRepository = inject(UsersListRepository),
    router: Router = inject(Router)
  ) => {
    const table = TableFacadeFeature.create({
      effects,
      store: repo.usersTableStore,
    });

    return {
      table,

      rolesOptions: repo.rolesOptions,
      fetchCollections(): void {
        effects.fetchRoles();
      },
      toCreateUserPage(): void {
        router.navigate(['user/create']);
      },
      toUpdateUserPage(id: string): void {
        router.navigate([`user/update`, id]);
      },
    };
  }
);

export const provideUsersListFacadeWithDeps = (): Provider[] => [
  UsersListFacade.provide(),
  provideUsersListStore(),
];

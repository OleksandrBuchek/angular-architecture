import { Provider } from '@angular/core';
import { UsersListRepository } from './users-list.repo';
import { UsersListEffects } from './users-list.effects';

export const provideUsersListStore = (): Provider[] => [
  UsersListRepository,
  UsersListEffects,
];

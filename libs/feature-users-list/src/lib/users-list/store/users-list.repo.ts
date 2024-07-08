import {
  simpleEntitiesStore,
  withSimpleEntities,
  withTable,
} from '@shared/util-store';
import { User, UserRole } from '../models';
import { computed, Injectable, Signal } from '@angular/core';
import { UsersListTableColumnKey } from '../table';
import { signalStore } from '@ngrx/signals';
import { createInstance } from '@shared/util-helpers';
import { UIOption } from '@shared/util-types';

const TableStore = signalStore(
  withTable<UsersListTableColumnKey>({ column: 'id', direction: 'asc' }),
  withSimpleEntities<User>()
);

@Injectable()
export class UsersListRepository {
  public readonly usersTableStore = createInstance(TableStore);
  public readonly rolesStore = simpleEntitiesStore<UserRole>();

  public readonly rolesOptions: Signal<Array<UIOption<UserRole>>> = computed(
    () =>
      this.rolesStore.entities().map((role) => ({
        value: role,
        label: role,
      }))
  );
}

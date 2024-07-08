import {
  createNgxColumns,
  createMaterialTableConfig,
} from '@shared/ui-material-table-wrapper';
import {
  USERS_LIST_TABLE_COLUMNS_ORDER,
  UsersListTableColumnKey,
} from './table.columns';
import { type } from '@ngrx/signals';
import { User } from '../models';
import { UsersListFacade } from '../users-list.facade';
import {
  createTableItemActionsComponent,
  createWithTooltipComponentPartial,
} from './components';
import { getTableItemActions, UserTableAction } from './options';

const withTableItemActions = (data: User) =>
  createTableItemActionsComponent({
    inputs: {
      items: getTableItemActions(),
      label: 'Actions',
    },
    outputsHandlers: {
      onSelected: (action) => {
        if ((action as UserTableAction) === UserTableAction.Update) {
          UsersListFacade.inject().toUpdateUserPage(data.id);
        }
      },
    },
  });

const getColumns = createNgxColumns({
  columnKey: type<UsersListTableColumnKey>(),
  data: type<User>(),
  factory: () => {
    return {
      id: {
        header: {
          title: 'ID',
        },
        cell: (data) => ({
          value: data.id,
        }),
      },
      email: {
        header: {
          title: 'Email',
        },
        cell: (data) => ({
          value: data.email,
        }),
      },
      fullName: {
        header: {
          title: 'Fullname',
        },
        cell: (data) => ({
          value: `${data.firstName} ${data.lastName}`,
        }),
      },
      role: {
        header: {
          title: 'Role',
          wrappers: [
            createWithTooltipComponentPartial({
              inputs: {
                text: 'This column indicates the role of the user',
              },
            }),
          ],
        },
        cell: (data) => ({
          value: data.role,
        }),
      },
      startDate: {
        header: {
          title: 'Start date',
        },
        cell: (data) => ({
          value: data.startDate,
        }),
      },
      actions: {
        header: {
          title: 'Actions',
        },
        cell: (data) => ({
          template: withTableItemActions(data),
        }),
      },
    };
  },
});

export const getUsersListTableConfig = createMaterialTableConfig({
  columnKey: type<UsersListTableColumnKey>(),
  data: type<User>(),
  factory: () => {
    const facade = UsersListFacade.inject();

    return {
      cacheKey: (data) =>
        `${data.id}-${data.firstName}-${data.lastName}-${data.email}`,
      columns: getColumns(),
      order: USERS_LIST_TABLE_COLUMNS_ORDER,
      props: {
        onSort: (columnName) => {
          facade.table.sortBy(columnName);
        },
        isLoading: facade.table.isTableDataLoading,
        isLastPage: facade.table.isLastPage,
      },
    };
  },
});

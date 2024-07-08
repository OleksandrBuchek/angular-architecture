import { UIOption } from '@shared/util-types';

export type UserTableAction =
  (typeof UserTableAction)[keyof typeof UserTableAction];

export const UserTableAction = {
  Update: 'Update',
  Delete: 'Delete',
} as const;

export const getTableItemActions = (): Array<UIOption<UserTableAction>> => [
  {
    label: 'Update user',
    value: UserTableAction.Update,
  },
  {
    label: 'Delete user',
    value: UserTableAction.Delete,
  },
];

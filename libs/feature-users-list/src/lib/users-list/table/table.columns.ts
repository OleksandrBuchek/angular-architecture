export const USERS_LIST_TABLE_COLUMNS = [
  'fullName',
  'email',
  'role',
  'id',
  'startDate',
  'actions',
] as const;

export type UsersListTableColumnKey = (typeof USERS_LIST_TABLE_COLUMNS)[number];

export const USERS_LIST_TABLE_COLUMNS_ORDER: UsersListTableColumnKey[] = [
  'id',
  'email',
  'fullName',
  'role',
  'startDate',
  'actions',
];

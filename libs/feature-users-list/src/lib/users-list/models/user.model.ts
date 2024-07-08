export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const UserRole = {
  Admin: 'Admin',
  Support: 'Support',
  Developer: 'Developer',
  Manager: 'Manager',
} as const;

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  startDate: string;
}

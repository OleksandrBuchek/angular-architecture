import { Route } from '@angular/router';

export const featureUsersListRoutes: Route[] = [
  { 
    path: '', 
    loadComponent: async () =>
    (await import('./users-list/users-list.component')).UsersListComponent
  },
];

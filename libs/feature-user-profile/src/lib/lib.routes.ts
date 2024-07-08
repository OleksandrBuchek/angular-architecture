import { Route } from '@angular/router';
import { isExistingUserGuard } from './use-cases/update-user';
import { CurrentUserFeatureFacade } from './shared';

export const featureUserProfileRoutes: Route[] = [
  {
    path: 'create',
    loadComponent: async () =>
      (await import('./use-cases/create-user/create-user.component'))
        .CreateUserComponent,
  },
  {
    path: 'update/:id',
    canActivate: [isExistingUserGuard],
    providers: [CurrentUserFeatureFacade.provide()],
    loadComponent: async () =>
      (await import('./use-cases/update-user/update-user.component'))
        .UpdateUserComponent,
  },
];

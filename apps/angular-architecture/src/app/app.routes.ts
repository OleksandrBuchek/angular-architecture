import { Route } from '@angular/router';
import { featureUserProfileRoutes } from '@feature-user-profile';
import { featureUsersListRoutes } from '@feature-users-list';

export const appRoutes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'users',
    },
    {
        path: 'user',
        children: featureUserProfileRoutes
    },
    {
        path: 'users', 
        children: featureUsersListRoutes
    },
    {
        path: '**',
        redirectTo: '',
    },
];

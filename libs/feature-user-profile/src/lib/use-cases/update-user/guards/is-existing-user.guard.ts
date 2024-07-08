import { ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';
import { asObservable } from '@shared/util-rxjs-interop';
import { filter } from 'rxjs';
import { CurrentUserFeatureFacade } from '../../../shared';

export const isExistingUserGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const currentUserFacade = CurrentUserFeatureFacade.inject();

  if (currentUserFacade.isLoaded()) {
    return true;
  }

  currentUserFacade.fetchUser(route.params['id']);

  return asObservable(currentUserFacade.isLoaded).pipe(filter((isLoaded) => isLoaded));
};

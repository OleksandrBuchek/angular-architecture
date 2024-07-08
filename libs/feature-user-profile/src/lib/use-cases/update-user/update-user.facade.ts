import {
  UserProfileCollectionsFeatureFacade,
  provideUserProfileCollectionsFeature,
  CurrentUserFeatureFacade,
} from '../../shared';
import { Provider, inject } from '@angular/core';
import { UpdateUserEffects, UpdateUserRepository } from './store';
import { createInjectionToken } from '@shared/util-di';

export const UpdateUserFacade = createInjectionToken(
  (
    collections: typeof UserProfileCollectionsFeatureFacade.type = UserProfileCollectionsFeatureFacade.inject(),
    currentUserFacade: typeof CurrentUserFeatureFacade.type = CurrentUserFeatureFacade.inject(),
    effects: UpdateUserEffects = inject(UpdateUserEffects),
    repo: UpdateUserRepository = inject(UpdateUserRepository)
  ) => {
    return {
      // Features
      collections,

      // Queries
      user: currentUserFacade.user,
      userLoadingState: currentUserFacade.loadingState,
      isUserUpdating: repo.updateUserCallState.isLoading,
      pageData: repo.pageData,

      // Methods
      fetchUser: currentUserFacade.fetchUser,
      updateUser: effects.updateUser,
      onDestroy(): void {
        currentUserFacade.onDestroy();
      },
    };
  }
);

export const provideUpdateUserFacadeWithDeps = (): Provider[] => {
  return [
    provideUserProfileCollectionsFeature(),
    UpdateUserEffects,
    UpdateUserRepository,
    UpdateUserFacade.provide(),
  ];
};

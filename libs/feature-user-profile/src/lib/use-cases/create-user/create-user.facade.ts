import {
  PersonInfoForm,
  UserProfileCollectionsFeatureFacade,
  provideUserProfileCollectionsFeature,
} from '../../shared';
import { Provider, inject } from '@angular/core';
import { CreateUserEffects, CreateUserRepository } from './store';
import { createInjectionToken } from '@shared/util-di';
import { CreateUserRequest } from '../../models';

export const CreateUserFacade = createInjectionToken(
  (
    collections: typeof UserProfileCollectionsFeatureFacade.type = UserProfileCollectionsFeatureFacade.inject(),
    effects: CreateUserEffects = inject(CreateUserEffects),
    repo: CreateUserRepository = inject(CreateUserRepository)
  ) => {
    return {
      // Features
      collections,

      // Queries
      isUserCreating: repo.createUserCallState.isLoading,

      // Methods
      createUser(formData: PersonInfoForm['value']): void {
        effects.createUser(formData as CreateUserRequest);
      },
    };
  }
);

export const provideCreateUserFacadeWithDeps = (): Provider[] => {
  return [
    provideUserProfileCollectionsFeature(),
    CreateUserEffects,
    CreateUserRepository,
    CreateUserFacade.provide(),
  ];
};

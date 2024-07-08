import { callStateStore } from '@shared/util-store';
import { CurrentUserFeatureFacade, UserProfileCollectionsRepository } from '../../../shared';
import { computed } from '@angular/core';
import { combineWithData } from '@shared/util-loading-state';

export class UpdateUserRepository {
  private readonly currentUserFacade = CurrentUserFeatureFacade.inject();
  private readonly collectionRepo = UserProfileCollectionsRepository.inject();

  public readonly updateUserCallState = callStateStore();

  public readonly pageData = computed(() =>
    combineWithData({
      user: this.currentUserFacade.loadingState(),
      collection: this.collectionRepo.countriesLoadingState(),
    }),
  );
}

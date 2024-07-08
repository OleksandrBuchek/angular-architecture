import { inject } from '@angular/core';
import { rxRequest } from '@shared/util-rxjs-interop';
import { UsersApi } from '../../../data-access';
import { UpdateUserRepository } from './update-user.repository';
import { CurrentUserFeatureFacade, PersonInfoForm } from '../../../shared';
import { assertValue } from '@shared/util-helpers';
import { formValueToPayload } from '../mappers';

export class UpdateUserEffects {
  private readonly usersApi = inject(UsersApi);
  private readonly repository = inject(UpdateUserRepository);
  private readonly currentUserFacade = CurrentUserFeatureFacade.inject();

  public readonly updateUser = rxRequest<PersonInfoForm['value'], void>({
    requestFn: (formData) =>
      this.usersApi.updateUser(formValueToPayload(formData, assertValue(this.currentUserFacade.user))),
    store: this.repository.updateUserCallState,
  });
}

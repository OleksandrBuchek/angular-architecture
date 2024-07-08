import { inject } from '@angular/core';
import { rxRequest } from '@shared/util-rxjs-interop';
import { UsersApi } from '../../../data-access';
import { CreateUserRequest } from '../../../models';
import { CreateUserRepository } from './create-user.repository';

export class CreateUserEffects {
  private readonly usersApi = inject(UsersApi);
  private readonly repository = inject(CreateUserRepository);

  public readonly createUser = rxRequest<CreateUserRequest, void>({
    requestFn: (payload) => this.usersApi.createUser(payload),
    store: this.repository.createUserCallState,
  });
}

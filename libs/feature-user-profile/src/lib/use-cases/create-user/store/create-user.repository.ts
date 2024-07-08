import { callStateStore } from '@shared/util-store';

export class CreateUserRepository {
  public readonly createUserCallState = callStateStore();
}

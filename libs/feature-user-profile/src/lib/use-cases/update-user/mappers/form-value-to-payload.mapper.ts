import { UpdateUserRequest, User } from '../../../models';
import { PersonInfoForm } from '../../../shared';

export const formValueToPayload = (formValue: PersonInfoForm['value'], currentUser: User): UpdateUserRequest => {
  return {
    ...currentUser,
    ...formValue,
  };
};

import { DeepPartial } from '@shared/util-types';

export interface Address {
  addressLine1: string;
  addressLine2?: string | null;
  zip: string;
  country: number | null;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  address: Address;
}

export type CreateUserRequest = Omit<User, 'id'>;
export type UpdateUserRequest = DeepPartial<CreateUserRequest> & Pick<User, 'id'>;

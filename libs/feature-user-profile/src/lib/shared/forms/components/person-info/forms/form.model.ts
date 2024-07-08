import { FormGroup, FormControl } from '@angular/forms';
import { AddressForm } from '../../address';

export type PersonInfoForm = FormGroup<{
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  address: AddressForm;
}>;

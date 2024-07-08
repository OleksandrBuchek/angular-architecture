import { FormControl, FormGroup } from '@angular/forms';

export type AddressForm = FormGroup<{
  addressLine1: FormControl<string>;
  addressLine2: FormControl<string | null>;
  zip: FormControl<string>;
  country: FormControl<number | null>;
}>;

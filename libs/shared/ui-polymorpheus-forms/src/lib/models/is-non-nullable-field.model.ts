import { FormArray, FormGroup } from '@angular/forms';
import { IsNever } from '@shared/util-types';

export type IsNonNullableField<
  Form extends FormGroup | FormArray,
  Key extends keyof Form['controls'] | number,
> = IsNever<Extract<Required<Form['value'][Key]>, null>>;

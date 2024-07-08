import { FormGroup, FormArray } from '@angular/forms';
import { IsNever } from '@shared/util-types';

export type GetControlValue<
  Form extends FormGroup | FormArray,
  Key extends keyof Form['controls'] | number = never,
> = IsNever<Key> extends true ? Form['value'] : Form['value'][Key];

import { FormGroup, FormArray } from '@angular/forms';
import { FormControlConfigBase } from './base.model';
import { WithColorProps } from './props';

interface CheckboxProps extends WithColorProps {}

export interface CheckboxFormControlConfig<
  Form extends FormGroup | FormArray,
  Key extends keyof Form['controls'] | number,
> extends FormControlConfigBase<Form, Key> {
  type: 'Checkbox';
  props: CheckboxProps;
  validation?: never;
}

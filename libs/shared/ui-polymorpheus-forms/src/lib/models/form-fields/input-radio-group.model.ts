import { FormGroup, FormArray } from '@angular/forms';
import { FormFieldValidationBase } from '../form-field-validation.model';
import { FormControlConfigBase } from './base.model';
import { WithColorProps, WithOptions } from './props';

export interface InputRadioGroupProps<Form extends FormGroup | FormArray>
  extends Partial<WithColorProps>,
    WithOptions<Form> {}

export interface InputRadioFormControlConfig<
  Form extends FormGroup | FormArray,
  Key extends keyof Form['controls'] | number,
> extends FormControlConfigBase<Form, Key> {
  type: 'InputRadioGroup';
  props: InputRadioGroupProps<Form>;
  validation?: Partial<FormFieldValidationBase<Form>>;
}

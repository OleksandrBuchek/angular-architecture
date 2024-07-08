import { FormGroup, FormArray } from '@angular/forms';
import { FormControlConfigValidationWithParams } from '../form-field-validation.model';
import { NumberFieldFormControlConfigValidationParams } from '../validation-params.model';
import { FormControlConfigBase } from './base.model';
import { FieldPropsBase, WithSuffixAndPrefix } from './props';

export type NumberFieldFormControlConfigValidation<
  Form extends FormGroup | FormArray,
  Key extends keyof Form['controls'] | number,
> = FormControlConfigValidationWithParams<Form, Key, NumberFieldFormControlConfigValidationParams>;

export interface InputNumberProps extends FieldPropsBase, Partial<WithSuffixAndPrefix> {
  step?: number;
}

export interface InputNumberFormControlConfig<
  Form extends FormGroup | FormArray,
  Key extends keyof Form['controls'] | number,
> extends FormControlConfigBase<Form, Key> {
  type: 'InputNumber';
  props: InputNumberProps;
  validation?: Partial<NumberFieldFormControlConfigValidation<Form, Key>>;
}

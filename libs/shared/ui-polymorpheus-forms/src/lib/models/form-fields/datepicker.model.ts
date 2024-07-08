import { FormGroup, FormArray } from '@angular/forms';
import { FormControlConfigValidationWithParams } from '../form-field-validation.model';
import { DatepickerFormControlConfigValidationParams } from '../validation-params.model';
import { FormControlConfigBase } from './base.model';
import { FieldPropsBase } from './props';

export interface DatepickerProps extends FieldPropsBase {
  icon?: string;
}

export type DatepickerFormControlConfigValidation<
  Form extends FormGroup | FormArray,
  Key extends keyof Form['controls'] | number,
> = FormControlConfigValidationWithParams<Form, Key, DatepickerFormControlConfigValidationParams>;

export interface DatepickerFormControlConfig<
  Form extends FormGroup | FormArray,
  Key extends keyof Form['controls'] | number,
> extends FormControlConfigBase<Form, Key> {
  type: 'Datepicker';
  props: DatepickerProps;
  validation?: Partial<DatepickerFormControlConfigValidation<Form, Key>>;
}

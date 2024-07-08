/* eslint-disable @typescript-eslint/naming-convention */

import { FormArray, FormGroup } from '@angular/forms';
import { FormControlType } from './form-control-type.model';
import {
  InputTextFormControlConfig,
  AutocompleteFormControlConfig,
  CheckboxFormControlConfig,
  InputNumberFormControlConfig,
  DatepickerFormControlConfig,
  InputAmountFormControlConfig,
  SelectionListFormControlConfig,
  SingleSelectFormControlConfig,
  InputRadioFormControlConfig,
  TextAreaFormControlConfig,
  SliderToggleFormControlConfig,
} from './form-fields';

export type FormControlConfig<
  Form extends FormGroup | FormArray,
  Key extends keyof Form['controls'] | number
> =
  | SingleSelectFormControlConfig<Form, Key>
  | InputRadioFormControlConfig<Form, Key>
  | InputTextFormControlConfig<Form, Key>
  | TextAreaFormControlConfig<Form, Key>
  | AutocompleteFormControlConfig<Form, Key>
  | CheckboxFormControlConfig<Form, Key>
  | InputNumberFormControlConfig<Form, Key>
  | DatepickerFormControlConfig<Form, Key>
  | InputAmountFormControlConfig<Form, Key>
  | SliderToggleFormControlConfig<Form, Key>
  | SelectionListFormControlConfig<Form, Key>;

export type FormControlConfigMap<
  Form extends FormGroup | FormArray,
  Key extends keyof Form['controls'] | number
> = {
  [FormControlType.SingleSelect]: SingleSelectFormControlConfig<Form, Key>;
  [FormControlType.InputRadioGroup]: InputRadioFormControlConfig<Form, Key>;
  [FormControlType.InputText]: InputTextFormControlConfig<Form, Key>;
  [FormControlType.TextArea]: TextAreaFormControlConfig<Form, Key>;
  [FormControlType.Autocomplete]: AutocompleteFormControlConfig<Form, Key>;
  [FormControlType.Checkbox]: CheckboxFormControlConfig<Form, Key>;
  [FormControlType.InputNumber]: InputNumberFormControlConfig<Form, Key>;
  [FormControlType.Datepicker]: DatepickerFormControlConfig<Form, Key>;
  [FormControlType.InputAmount]: InputAmountFormControlConfig<Form, Key>;
  [FormControlType.SliderToggle]: SliderToggleFormControlConfig<Form, Key>;
  [FormControlType.SelectionList]: SelectionListFormControlConfig<Form, Key>;
};

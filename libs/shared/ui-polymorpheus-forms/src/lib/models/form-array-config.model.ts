import { FormArray } from '@angular/forms';
import { FormFieldConfigBase } from './form-field-config-base.model';
import { GetFormFieldConfig } from './get-form-field-config.model';

export interface FormArrayConfig<Form extends FormArray> extends FormFieldConfigBase<Form> {
  defaultValue?: Required<Form['value']>;
  controls: GetFormFieldConfig<Form, number>;
  isArray: true;
  props?: Partial<{
    itemsMax: number;
  }>;
}

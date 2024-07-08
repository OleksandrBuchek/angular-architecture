import { FormGroup } from '@angular/forms';
import { GetFormFieldConfig } from './get-form-field-config.model';
import { FormFieldConfigBase } from './form-field-config-base.model';
export interface FormGroupConfig<Form extends FormGroup> extends FormFieldConfigBase<Form> {
  controls: {
    [Key in keyof Form['controls']]: GetFormFieldConfig<Form, Key>;
  };
}

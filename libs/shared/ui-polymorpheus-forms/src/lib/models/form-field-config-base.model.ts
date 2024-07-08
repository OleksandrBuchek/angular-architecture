import { FormArray, FormGroup } from '@angular/forms';
import { FormFieldConfigHooksMap } from './form-field-config-hooks.model';
import { FormFieldConfigStateChangesMap } from './form-field-states.model';
import { FormFieldConfigActionsMap } from './form-field-config-actions.model';
import { FormFieldValidationBase } from './form-field-validation.model';

export interface FormFieldConfigBase<
  Form extends FormGroup | FormArray,
  Key extends keyof Form['controls'] | number = never,
> {
  validation?: Partial<FormFieldValidationBase<Form>>;
  hooks?: Partial<FormFieldConfigHooksMap<Form>>;
  states?: Partial<FormFieldConfigStateChangesMap<Form>>;
  actions?: Partial<FormFieldConfigActionsMap<Form, Key>>;
}

import { FormGroup } from '@angular/forms';
import { FormControlConfigValidationWithParams, FormFieldConfigBase } from '../models';

export const getValidationWithParams = <Form extends FormGroup>(
  config: FormFieldConfigBase<Form>,
): Partial<FormControlConfigValidationWithParams<Form, keyof Form['controls']>> =>
  (config.validation as Partial<FormControlConfigValidationWithParams<Form, keyof Form['controls']>>) ?? {};

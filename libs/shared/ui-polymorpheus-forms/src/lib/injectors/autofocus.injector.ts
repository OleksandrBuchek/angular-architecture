import { FormGroup } from '@angular/forms';
import { FieldPropsBase } from '../models';
import { injectControlConfig } from './control-config.injector';

export const injectAutofocus = <Form extends FormGroup, Key extends keyof Form['controls']>(): boolean => {
  return (injectControlConfig<Form, Key>().props as FieldPropsBase).autofocus ?? false;
};

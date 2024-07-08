import { FormGroup } from '@angular/forms';
import { SingleSelectProps } from '../models';
import { injectControlConfig } from './control-config.injector';

export const injectIsMultipleSelection = <Form extends FormGroup, Key extends keyof Form['controls']>(): boolean => {
  const isMultiple = ((injectControlConfig().props ?? {}) as Partial<SingleSelectProps<Form, Key>>).multiple;

  return isMultiple ?? false;
};

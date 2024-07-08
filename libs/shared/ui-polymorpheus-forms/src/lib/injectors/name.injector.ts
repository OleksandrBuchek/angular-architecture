import { FormGroup } from '@angular/forms';
import { injectControlConfig } from './control-config.injector';
import { WithName } from '../models';

const EMPTY_NAME = '';

export const injectName = <Form extends FormGroup, Key extends keyof Form['controls']>(): string => {
  return (injectControlConfig<Form, Key>().props as WithName).name ?? EMPTY_NAME;
};

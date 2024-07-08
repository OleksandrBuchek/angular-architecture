import { FormGroup } from '@angular/forms';
import { injectControlConfig } from './control-config.injector';
import { InputNumberProps } from '../models';

const STEP_VALUE_DEFAULT = 1;

export const injectStepAttribute = <Form extends FormGroup, Key extends keyof Form['controls']>(): number => {
  return (injectControlConfig<Form, Key>().props as InputNumberProps).step ?? STEP_VALUE_DEFAULT;
};

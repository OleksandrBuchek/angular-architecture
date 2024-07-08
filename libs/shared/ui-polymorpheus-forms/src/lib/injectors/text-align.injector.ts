import { FormGroup } from '@angular/forms';
import { InputAmountProps } from '../models';
import { injectControlConfig } from './control-config.injector';

export const injectTextAlignClassName = <Form extends FormGroup, Key extends keyof Form['controls']>():
  | 'text-end'
  | 'text-start' => {
  const props = (injectControlConfig<Form, Key>().props as Partial<InputAmountProps>) ?? {};

  const textAlign = props.textAlign ?? 'left';

  return textAlign === 'right' ? 'text-end' : 'text-start';
};

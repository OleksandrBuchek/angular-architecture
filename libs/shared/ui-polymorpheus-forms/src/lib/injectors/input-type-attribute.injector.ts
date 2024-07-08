import { FormGroup } from '@angular/forms';
import { injectControlConfig } from './control-config.injector';
import { TextInputProps, TextInputTypeAttribute } from '../models';

export const injectInputTypeAttribute = <
  Form extends FormGroup,
  Key extends keyof Form['controls'],
>(): TextInputTypeAttribute => {
  return (injectControlConfig<Form, Key>().props as TextInputProps<Form, Key>).type ?? TextInputTypeAttribute.text;
};

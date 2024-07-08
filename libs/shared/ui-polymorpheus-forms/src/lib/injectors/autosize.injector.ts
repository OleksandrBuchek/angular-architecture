import { FormGroup } from '@angular/forms';
import { TextAreaProps } from '../models';
import { injectControlConfig } from './control-config.injector';

export const injectAutosizeProps = <Form extends FormGroup, Key extends keyof Form['controls']>(): Pick<
  TextAreaProps,
  'autosize' | 'minRows' | 'maxRows'
> => {
  return injectControlConfig<Form, Key>().props as TextAreaProps;
};

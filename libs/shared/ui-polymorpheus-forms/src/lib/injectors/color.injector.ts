import { FormGroup } from '@angular/forms';
import { injectControlConfig } from './control-config.injector';
import { FieldColor, WithColorProps } from '../models';

export const injectColor = <Form extends FormGroup, Key extends keyof Form['controls']>(): FieldColor => {
  return (injectControlConfig<Form, Key>().props as Partial<WithColorProps> | undefined)?.color ?? 'primary';
};

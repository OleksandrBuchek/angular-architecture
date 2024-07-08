import { FormGroup } from '@angular/forms';
import { injectControlConfig } from './control-config.injector';
import { LabelPosition, WithLabelPosition } from '../models';

export const injectLabelPosition = <Form extends FormGroup, Key extends keyof Form['controls']>(): LabelPosition => {
  return (injectControlConfig<Form, Key>().props as Partial<WithLabelPosition> | undefined)?.labelPosition ?? 'before';
};

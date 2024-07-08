import { FormGroup } from '@angular/forms';
import { injectControlConfig } from './control-config.injector';
import { DatepickerProps } from '../models';

export const injectDatepickerIcon = <Form extends FormGroup, Key extends keyof Form['controls']>(): string => {
  return (injectControlConfig<Form, Key>().props as DatepickerProps).icon ?? 'keyboard_arrow_down';
};

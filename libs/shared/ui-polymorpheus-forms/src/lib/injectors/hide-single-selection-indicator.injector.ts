import { FormGroup } from '@angular/forms';
import { SingleSelectProps } from '../models';
import { injectControlConfig } from './control-config.injector';

export const injectHideSingleSelectionIndicator = <
  Form extends FormGroup,
  Key extends keyof Form['controls'],
>(): boolean => {
  const hideSingleSelectionIndicator = ((injectControlConfig().props ?? {}) as Partial<SingleSelectProps<Form, Key>>)
    .hideSingleSelectionIndicator;

  return hideSingleSelectionIndicator ?? true;
};

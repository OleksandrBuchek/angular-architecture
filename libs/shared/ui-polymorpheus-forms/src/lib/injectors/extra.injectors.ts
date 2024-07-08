import { injectControlConfig } from './control-config.injector';
import { FormControlConfigBase } from '../models';
import { FormGroup } from '@angular/forms';
import { injectFormFieldName } from './field-name.injector';

export const injectExtra = <Form extends FormGroup, Key extends keyof Form['controls']>(): FormControlConfigBase<
  Form,
  Key
>['extra'] => {
  const config = injectControlConfig();
  const fieldName = injectFormFieldName();

  return (
    config.extra ?? {
      e2eAttr: `${fieldName}-form-field`,
    }
  );
};

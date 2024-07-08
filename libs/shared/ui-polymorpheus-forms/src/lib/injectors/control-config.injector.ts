import { inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormGroupFacade } from '../facades';
import { FormControlConfig } from '../models';
import { injectFormFieldName } from './field-name.injector';

export const injectControlConfig = <Form extends FormGroup, Key extends keyof Form['controls']>(): FormControlConfig<
  Form,
  Key
> => {
  const facade = inject<FormGroupFacade<Form>>(FormGroupFacade);

  return facade.config.controls[injectFormFieldName()] as FormControlConfig<Form, Key>;
};

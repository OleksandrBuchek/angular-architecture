import { inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormGroupFacade } from '../facades';
import { injectFormFieldName } from './field-name.injector';

export const injectFieldControl = <Form extends FormGroup, Key extends keyof Form['controls']>(): FormControl<
  Form['value'][Key]
> => {
  const facade = inject<FormGroupFacade<Form>>(FormGroupFacade);

  return facade.form.get(injectFormFieldName() as string) as FormControl<Form['value'][Key]>;
};

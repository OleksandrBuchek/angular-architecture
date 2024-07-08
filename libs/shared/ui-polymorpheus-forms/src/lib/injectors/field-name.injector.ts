import { inject } from '@angular/core';
import { FormFieldNameDirective } from '../directives';
import { FormGroup } from '@angular/forms';

export const injectFormFieldName = <Form extends FormGroup, Key extends keyof Form['controls']>(): Key =>
  inject<FormFieldNameDirective<Form, Key>>(FormFieldNameDirective).name();

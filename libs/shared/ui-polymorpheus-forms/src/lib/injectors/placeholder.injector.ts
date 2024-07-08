import { FormGroup } from '@angular/forms';
import { EMPTY_PLACEHOLDER } from '../constants';
import { injectControlConfig } from './control-config.injector';
import { FieldPropsBase } from '../models';
import { Observable, isObservable, of } from 'rxjs';

export const injectPlaceholder = <Form extends FormGroup, Key extends keyof Form['controls']>(): Observable<string> => {
  const placeholder = (injectControlConfig<Form, Key>().props as FieldPropsBase).placeholder ?? EMPTY_PLACEHOLDER;

  return isObservable(placeholder) ? placeholder : of(placeholder);
};

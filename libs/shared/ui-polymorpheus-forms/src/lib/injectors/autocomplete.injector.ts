import { FormGroup } from '@angular/forms';
import { injectControlConfig } from './control-config.injector';
import { FieldPropsBase } from '../models';
import { Observable, isObservable, of } from 'rxjs';

const AUTOCOMPLETE_VALUE_DEFAULT = 'on';

export const injectAutocomplete = <
  Form extends FormGroup,
  Key extends keyof Form['controls'],
>(): Observable<string> => {
  const autocomplete =
    (injectControlConfig<Form, Key>().props as FieldPropsBase).autocomplete ?? AUTOCOMPLETE_VALUE_DEFAULT;

  return isObservable(autocomplete) ? autocomplete : of(autocomplete);
};

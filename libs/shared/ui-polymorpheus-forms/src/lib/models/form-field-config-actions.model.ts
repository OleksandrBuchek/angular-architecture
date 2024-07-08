import { FormGroup, FormArray } from '@angular/forms';
import { IsNever } from '@shared/util-types';
import { Observable } from 'rxjs';
import { GetControlValue } from './get-control-value.model';

export type OnChangeFn<Form extends FormGroup | FormArray, Key extends keyof Form['controls'] | number = never> = (
  state: GetControlValue<Form, Key>,
  form: Form,
) => void;

export type OnChangeAsyncFn<Form extends FormGroup | FormArray, Key extends keyof Form['controls'] | number = never> = (
  state$: IsNever<Key> extends true ? Observable<Required<Form['value']>> : Observable<Required<Form['value']>[Key]>,
  form: Form,
) => Observable<unknown>;

export interface FormFieldConfigActionsMap<
  Form extends FormGroup | FormArray,
  Key extends keyof Form['controls'] | number = never,
> {
  onChange: OnChangeFn<Form, Key>;
  onChangeAsync: OnChangeAsyncFn<Form, Key>;
}

import { FormGroup, FormArray, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { TypedAsyncValidatorFn, TypedValidatorFn } from './typed-validators.model';
import { AsSignals, ValueOrFactory, WithSignals } from '@shared/util-types';

export interface FormFieldValidationBase<Form extends FormGroup | FormArray> {
  validators: () => ValidatorFn[];
  asyncValidators: () => AsyncValidatorFn[];
  deferredValidators: (form: Form) => Array<TypedValidatorFn<Required<Form['value']>>>;
  deferredAsyncValidators: (form: Form) => Array<TypedAsyncValidatorFn<Required<Form['value']>>>;
  triggerOn: (form: Form) => Observable<unknown>;
  messages: () => Record<string, string | Observable<string>>;
}

type DeferredValidatorsParams<Form extends FormGroup | FormArray, Params extends ValidationParams> = {
  params: AsSignals<Params>;
  deferredParams: AsSignals<Params>;
  form: Form;
};

export type ValidationParams = Record<string, string | number | Date | null>;

export type FormControlValidationParamsInput<Params extends ValidationParams> = ValueOrFactory<
  Partial<WithSignals<Params>>
>;

export interface FormControlValidationParams<Params extends ValidationParams> {
  params: AsSignals<Params>;
  deferredParams: AsSignals<Params>;
}

export interface FormControlConfigValidationWithParams<
  Form extends FormGroup | FormArray,
  Key extends keyof Form['controls'] | number,
  Params extends ValidationParams = ValidationParams,
> extends Pick<FormFieldValidationBase<Form>, 'triggerOn'> {
  validators: (params: AsSignals<Params>) => Array<TypedValidatorFn<Required<Form['value']>[Key]>>;

  asyncValidators: (params: AsSignals<Params>) => Array<TypedAsyncValidatorFn<Required<Form['value']>[Key]>>;

  deferredValidators: (
    params: DeferredValidatorsParams<Form, Params>,
  ) => Array<TypedValidatorFn<Required<Form['value']>[Key]>>;
  deferredAsyncValidators: (
    params: DeferredValidatorsParams<Form, Params>,
  ) => Array<TypedAsyncValidatorFn<Required<Form['value']>[Key]>>;

  params: FormControlValidationParamsInput<Params>;
  deferredParams: () => Partial<WithSignals<Params>>;

  messages: (params: FormControlValidationParams<Params>) => Record<string, string | Observable<string>>;
}

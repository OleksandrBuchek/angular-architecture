import { Type } from '@angular/core';
import {
  PolymorpheusComponentParams,
  PolymorpheusComponentParamsPartial,
  ValueOrNever,
  PolymorpheusComponentInputs,
} from '../models';

export const getInputsFromParams = <TComponent extends Type<any>>(
  params?: PolymorpheusComponentParams<TComponent> | PolymorpheusComponentParamsPartial<TComponent>,
): ValueOrNever<PolymorpheusComponentInputs<TComponent>> => {
  return (typeof params === 'object' && 'inputs' in params ? params.inputs ?? {} : {}) as ValueOrNever<
    PolymorpheusComponentInputs<TComponent>
  >;
};

export const createInputsFor =
  <TComponent extends Type<any>>(_: TComponent) =>
  (inputs: PolymorpheusComponentInputs<TComponent>) =>
    inputs;

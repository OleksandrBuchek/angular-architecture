import { Type } from '@angular/core';
import {
  PolymorpheusComponentParams,
  PolymorpheusComponentParamsPartial,
  ValueOrNever,
  PolymorpheusComponentOutputsHandlers,
} from '../models';

export const getOutputHandlersFromParams = <TComponent extends Type<any>>(
  params?: PolymorpheusComponentParams<TComponent> | PolymorpheusComponentParamsPartial<TComponent>,
): ValueOrNever<Partial<PolymorpheusComponentOutputsHandlers<TComponent>>> => {
  return (
    typeof params === 'object' && 'outputsHandlers' in params ? params.outputsHandlers ?? {} : {}
  ) as ValueOrNever<Partial<PolymorpheusComponentOutputsHandlers<TComponent>>>;
};

export const createOutputsHandlersFor =
  <TComponent extends Type<any>>(_: TComponent) =>
  (outputsHandlers: PolymorpheusComponentOutputsHandlers<TComponent>) =>
    outputsHandlers;

export const getOutputHandlers = <TComponent extends Type<any>>(
  handlers: Partial<PolymorpheusComponentOutputsHandlers<TComponent>>,
): Partial<PolymorpheusComponentOutputsHandlers<TComponent>> => handlers;

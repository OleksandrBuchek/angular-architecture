import { Type } from '@angular/core';
import { PolymorpheusComponent } from '../classes';
import {
  PolymorpheusComponentFactory,
  PolymorpheusComponentInputs,
  PolymorpheusComponentOutputsHandlers,
  PolymorpheusComponentParams,
  PolymorpheusComponentParamsPartial,
  PolymorpheusComponentRestParams,
} from '../models';
import { toCssClass } from '@shared/util-helpers';
import { getInputsFromParams } from './inputs.util';
import { getOutputHandlersFromParams } from './outputs.util';

export const partial =
  <TComponent extends Type<any>>(factory: PolymorpheusComponentFactory<TComponent>) =>
  <PartialParams extends PolymorpheusComponentParamsPartial<TComponent>>(partial: PartialParams) =>
  (rest: PolymorpheusComponentRestParams<TComponent, PartialParams>): PolymorpheusComponent<TComponent> => {
    return factory(mergePartialWithRestParams(partial, rest));
  };

export const mergePartialWithRestParams = <
  TComponent extends Type<any>,
  PartialParams extends PolymorpheusComponentParamsPartial<TComponent>,
>(
  partial: PartialParams,
  rest: PolymorpheusComponentRestParams<TComponent, PartialParams>,
): PolymorpheusComponentParams<TComponent> => {
  const inputs = {
    ...getInputsFromParams(partial),
    ...getInputsFromParams(rest),
  } as PolymorpheusComponentInputs<TComponent>;

  const outputsHandlers = {
    ...getOutputHandlersFromParams(partial),
    ...getOutputHandlersFromParams(rest),
  } as PolymorpheusComponentOutputsHandlers<TComponent>;

  return {
    providers: [...(partial.providers ?? []), ...(rest.providers ?? [])],
    className: toCssClass(`${toCssClass(partial.className)} ${toCssClass(rest.className)}`),
    inputs,
    outputsHandlers,
  } as unknown as PolymorpheusComponentParams<TComponent>;
};

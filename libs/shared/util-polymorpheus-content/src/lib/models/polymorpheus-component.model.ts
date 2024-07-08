import { OutputEmitterRef, Provider, Type } from '@angular/core';
import {
  AsValuesOrReactives,
  AsSignals,
  ObjectValues,
  OmitNullish,
  ExtractInputSignalsValues,
  WithPartialUndefinedValues,
  ExtractEventEmitters,
} from '@shared/util-types';
import { PolymorpheusComponent } from '../classes';

export type PolymorpheusComponentOrFactory<TComponent extends Type<any>> =
  | PolymorpheusComponent<TComponent>
  | PolymorpheusComponentFactory<TComponent>;

export type PolymorpheusComponentInputs<TComponent extends Type<any>> = AsValuesOrReactives<
  WithPartialUndefinedValues<ExtractInputSignalsValues<InstanceType<TComponent>>>
>;

export type PolymorpheusComponentOutputsHandlers<TComponent extends Type<any>> = {
  [Key in keyof ExtractEventEmitters<InstanceType<TComponent>>]: ExtractEventEmitters<
    InstanceType<TComponent>
  >[Key] extends OutputEmitterRef<infer ValueType>
    ? (value: ValueType) => void
    : never;
};

export type PolymorpheusComponentContext<TComponent extends Type<any>> = AsSignals<
  ExtractInputSignalsValues<InstanceType<TComponent>>
>;

export type ValueOrNever<TValue extends object> = ObjectValues<TValue> extends never[] ? never : TValue;

type PolymorpheusComponentParamsBase = {
  className?: string | string[];
  providers?: Provider[];
};

export type PolymorpheusComponentParams<TComponent extends Type<any> = Type<any>> = PolymorpheusComponentParamsBase &
  OmitNullish<{
    inputs: ValueOrNever<PolymorpheusComponentInputs<TComponent>>;
    outputsHandlers?: ValueOrNever<Partial<PolymorpheusComponentOutputsHandlers<TComponent>>>;
  }>;

export type PolymorpheusComponentParamsPartial<TComponent extends Type<any> = Type<any>> =
  PolymorpheusComponentParamsBase &
    OmitNullish<
      Partial<{
        inputs: ValueOrNever<Partial<PolymorpheusComponentInputs<TComponent>>>;
        outputsHandlers: ValueOrNever<Partial<PolymorpheusComponentOutputsHandlers<TComponent>>>;
      }>
    >;

export type PolymorpheusComponentFactory<TComponent extends Type<any>> = (
  params: PolymorpheusComponentParams<TComponent>,
) => PolymorpheusComponent<TComponent>;

export type PolymorpheusComponentRestParams<
  TComponent extends Type<any>,
  PartialParams extends PolymorpheusComponentParamsPartial<TComponent>,
> = PolymorpheusComponentParams<
  Type<
    Omit<
      InstanceType<TComponent>,
      PartialParams extends {
        inputs: Partial<PolymorpheusComponentInputs<TComponent>>;
        outputsHandlers: Partial<PolymorpheusComponentOutputsHandlers<TComponent>>;
      }
        ? keyof PartialParams['inputs'] & keyof PartialParams['outputsHandlers']
        : PartialParams extends { inputs: Partial<PolymorpheusComponentInputs<TComponent>> }
          ? keyof PartialParams['inputs']
          : PartialParams extends { outputsHandlers: Partial<PolymorpheusComponentOutputsHandlers<TComponent>> }
            ? keyof PartialParams['outputsHandlers']
            : ''
    >
  >
>;

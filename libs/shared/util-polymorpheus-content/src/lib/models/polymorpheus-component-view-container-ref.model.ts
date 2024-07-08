import { Injector, ViewContainerRef, DestroyRef, Type } from '@angular/core';
import { PolymorpheusComponentParams, PolymorpheusComponentParamsPartial } from './polymorpheus-component.model';

export interface PolymorpheusViewContainerRefParams {
  injector: Injector;
  viewContainer: ViewContainerRef;
  destroyRef: DestroyRef;
}

export type PolymorpheusComponentViewContainerRefParams<TComponent extends Type<any>> = (
  | PolymorpheusComponentParams<TComponent>
  | PolymorpheusComponentParamsPartial<TComponent>
) &
  Partial<PolymorpheusViewContainerRefParams>;

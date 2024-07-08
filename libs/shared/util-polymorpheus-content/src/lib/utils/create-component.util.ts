import { Type } from '@angular/core';
import { PolymorpheusComponent } from '../classes';
import { PolymorpheusComponentFactory, PolymorpheusComponentParams } from '../models';

export const createPolymorpheusComponent =
  <TComponent extends Type<any>>(component: TComponent): PolymorpheusComponentFactory<TComponent> =>
  (params?: PolymorpheusComponentParams<TComponent>) =>
    new PolymorpheusComponent(component, (params ?? {}) as PolymorpheusComponentParams<TComponent>);

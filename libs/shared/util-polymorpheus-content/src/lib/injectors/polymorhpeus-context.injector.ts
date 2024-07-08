import { Type, inject } from '@angular/core';
import { PolymorpheusComponentContext } from '../models';
import { POLYMORPHEUS_CONTEXT } from '../tokens';

export const injectPolymorpheusContext = <TComponent extends Type<any>>() =>
  inject<PolymorpheusComponentContext<TComponent>>(POLYMORPHEUS_CONTEXT);

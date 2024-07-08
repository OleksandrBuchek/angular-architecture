import { Type } from '@angular/core';
import { PolymorpheusComponentFactory, WithPolymorpheusContent } from '../models';
import { PolymorpheusComponent } from '../classes';

export const composeWrappers = (
  wrappers: Array<PolymorpheusComponentFactory<Type<WithPolymorpheusContent>>> = [],
  initialValue: PolymorpheusComponent<Type<any>>,
) => {
  return wrappers.reduce(
    (acc, curr) =>
      curr({
        inputs: {
          content: acc,
        },
      }),
    initialValue,
  );
};

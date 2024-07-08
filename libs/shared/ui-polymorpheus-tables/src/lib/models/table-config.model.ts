import { Type } from '@angular/core';
import {
  PolymorpheusComponent,
  PolymorpheusComponentFactory,
  WithPolymorpheusContent,
} from '@shared/util-polymorpheus-content';
import { ValueOrFactory, ValueOrReactive } from '@shared/util-types';

export interface TableColumnDef<Data = any, Props extends object = object> {
  header: {
    wrappers?: Array<PolymorpheusComponentFactory<Type<WithPolymorpheusContent>>>;
    className?: string | string[];
  } & (
    | {
        title: ValueOrReactive<string>;
      }
    | {
        template: PolymorpheusComponent;
      }
  );
  cell: (data: Data) => {
    className?: string | string[];
    wrappers?: Array<PolymorpheusComponentFactory<Type<WithPolymorpheusContent>>>;
  } & (
    | {
        value: any;
      }
    | {
        template: PolymorpheusComponent;
      }
  );
  className?: string | string[];
  isVisible?: ValueOrFactory<ValueOrReactive<boolean>>;
  props?: Partial<Props>;
}

export interface TableConfig<
  Columns extends Record<string, TableColumnDef> = Record<string, TableColumnDef>,
  Data = any,
  Props extends object = object,
> {
  cacheKey: (data: Data) => string;
  columns: Columns;
  order: ValueOrReactive<Array<keyof Columns>>;
  selection?: ValueOrReactive<Record<keyof Columns, boolean>>;
  className?: string | string[];
  props?: Partial<Props>;
}

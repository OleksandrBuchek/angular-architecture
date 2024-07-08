import { ValueOrFactory, ValueOrReactive } from '@shared/util-types';

export interface WithSuffixAndPrefix {
  suffix: ValueOrFactory<ValueOrReactive<string>>;
  prefix: ValueOrFactory<ValueOrReactive<string>>;
}

import { ValueOrFactory, ValueOrReactive } from '@shared/util-types';

export interface WithSuffixAndPrefixIcons {
  suffixIcon: ValueOrFactory<ValueOrReactive<string>>;
  prefixIcon: ValueOrFactory<ValueOrReactive<string>>;
}

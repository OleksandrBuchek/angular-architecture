import { ExcludeSymbolKey } from './exclude-symbol-key.type';

export type ObjectKeys<T extends object> = Array<`${ExcludeSymbolKey<T>}`>;

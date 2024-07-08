import { ExcludeSymbolKey } from './exclude-symbol-key.type';

export type ObjectValues<T extends object> = ExcludeSymbolKey<T> extends never
  ? never[]
  : Array<T[ExcludeSymbolKey<T>]>;

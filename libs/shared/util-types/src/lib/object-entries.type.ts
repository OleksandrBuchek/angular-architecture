import { ObjectKeys } from './object-keys.type';
import { ObjectValues } from './object-values.type';

export type ObjectEntries<T extends object> = Array<[ObjectKeys<T>[number], ObjectValues<T>[number]]>;

import { Signal } from '@angular/core';
import { Observable } from 'rxjs';

export type ValueOrReactive<TValue> = TValue | Observable<TValue> | Signal<TValue>;

export type AsValuesOrReactives<T extends Record<string, any>> = {
  [Key in keyof T]: ValueOrReactive<T[Key]>;
};

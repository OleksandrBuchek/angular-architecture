import { inject } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { asObservable } from '@shared/util-rxjs-interop';
import { ValueOrReactive, UIOption } from '@shared/util-types';
import { Observable, combineLatest, map } from 'rxjs';
import { controlValue } from './control-value.util';

export const filterOptionsByQuery = <T>(
  queryControl: AbstractControl<string>,
  options: ValueOrReactive<Array<UIOption<T>>> = []
): Observable<Array<UIOption<T>>> => {
  const query$ = controlValue(queryControl);

  return combineLatest([asObservable(options), query$]).pipe(
    map(([options, query]) =>
      query.length
        ? options.filter((option) => {
            const value =
              'label' in option ? option.label : option.translationKey;

            return value.toLowerCase().includes(query.toLowerCase());
          })
        : options
    )
  );
};

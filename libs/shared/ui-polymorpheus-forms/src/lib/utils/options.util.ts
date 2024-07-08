import { AbstractControl, FormControl } from '@angular/forms';
import { isEqual } from '@shared/util-helpers';
import { UIOption } from '@shared/util-types';
import { Observable, filter, map, tap } from 'rxjs';

export const clearSelectionWhenNoMatchingOptionExists = (
  control: AbstractControl,
  options$: Observable<Array<UIOption<unknown>>>,
): Observable<void> => {
  const hasMatchingOption$ = options$.pipe(
    map((options) => options.some(({ value }) => isEqual(value, control.value))),
  );

  return hasMatchingOption$.pipe(
    filter(
      (hasMatchingOption) => hasMatchingOption === false && control.value !== (control as FormControl).defaultValue,
    ),
    tap(() => {
      control.reset();
    }),
    map(() => undefined),
  );
};

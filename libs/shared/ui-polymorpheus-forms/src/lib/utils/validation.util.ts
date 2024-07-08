import { isSignal, signal, Signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormGroup } from '@angular/forms';
import { objectEntries, objectValues } from '@shared/util-object';
import { AsSignals } from '@shared/util-types';
import { Observable, map, merge, of } from 'rxjs';
import { FormControlValidationParamsInput, FormFieldConfigBase, ValidationParams } from '../models';
import { getValidationWithParams } from './get-validation-with-params.util';

export const getValidationParamsSignals = <Params extends ValidationParams>(
  paramsOrFactory: FormControlValidationParamsInput<Params> = {},
  defaultValue: AsSignals<ValidationParams> = {},
): AsSignals<Params> => {
  const params = typeof paramsOrFactory === 'function' ? paramsOrFactory() : paramsOrFactory;

  return objectEntries(params).reduce(
    (acc, [key, valueOrSignal]) => ({
      ...acc,
      [key]: isSignal(valueOrSignal) ? valueOrSignal : signal(valueOrSignal),
    }),
    defaultValue as AsSignals<Params>,
  );
};

export const getValidationParamsChanges = <Form extends FormGroup>(
  config: FormFieldConfigBase<Form>,
): Observable<void> => {
  const validation = getValidationWithParams(config);

  const params = objectValues(getValidationParamsSignals(validation.params));
  const deferredParams = objectValues(getValidationParamsSignals(validation.deferredParams));

  if (!params.length && !deferredParams.length) {
    return of(undefined);
  }

  const changes$ = [params, deferredParams]
    .flat()
    .filter((value): value is Signal<number | string | Date> => value() !== null)
    .map((signal$) => toObservable<number | string | Date>(signal$));

  return merge(...changes$).pipe(map(() => undefined));
};

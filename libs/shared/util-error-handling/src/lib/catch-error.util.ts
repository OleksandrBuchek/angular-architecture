import { HttpErrorResponse } from '@angular/common/http';
import { ObservableInput, Observable, OperatorFunction, ObservedValueOf, catchError, EMPTY, isObservable } from 'rxjs';
import { PGError } from './error';

export type CatchErrorHandlerFn<TError, TValue, TOutputValue extends ObservableInput<any>> = (
  error: PGError<TError>,
  caught$: Observable<TValue>,
) => TOutputValue | void;

export const catchPgError = <
  TError = HttpErrorResponse,
  TValue = unknown,
  TOutputValue extends ObservableInput<any> = ObservableInput<any>,
>(
  handler?: CatchErrorHandlerFn<TError, TValue, TOutputValue>,
): OperatorFunction<TValue, TValue | ObservedValueOf<TOutputValue> | never> => {
  return catchError((error, caught$) => {
    if (!handler) {
      return EMPTY;
    }

    const pgError = error instanceof PGError ? (error as PGError<TError>) : new PGError<TError>(error);

    const observableOrVoid = handler(pgError, caught$);

    return isObservable(observableOrVoid) ? observableOrVoid : EMPTY;
  });
};

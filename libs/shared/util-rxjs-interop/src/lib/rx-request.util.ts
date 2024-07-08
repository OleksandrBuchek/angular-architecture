import { HttpErrorResponse } from '@angular/common/http';
import { Injector, inject, runInInjectionContext } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { PGError, HttpErrorHandlersMap, catchPgError, handleError } from '@shared/util-error-handling';
import { RequestStatus } from '@shared/util-store';
import { Observable, pipe, tap, switchMap, from, filter, take } from 'rxjs';

export interface RxRequestParams<Input = void, Response = unknown> {
  requestFn: (input: Input) => Observable<Response> | Promise<Response>;
  store?: Partial<{
    setError(error: PGError<HttpErrorResponse> | null): void;
    setRequestStatus(status: RequestStatus): void;
  }>;
  errorHandler?: () => Partial<HttpErrorHandlersMap>;
  shouldFetch?: (input: Input) => boolean;
  onError?: (error: PGError<HttpErrorResponse>, input: Input) => void;
  onSuccess?: (response: Response, input: Input) => void;
  once?: boolean;
}

export const rxRequest = <Input = void, Response = unknown>(params: RxRequestParams<Input, Response>) => {
  const injector = inject(Injector);

  const pipeline = pipe(
    filter((input: Input) => (params.shouldFetch ? params.shouldFetch(input) : true)),
    tap(() => {
      params.store?.setRequestStatus && params.store.setRequestStatus('Loading');
    }),
    switchMap((input: Input) =>
      from(runInInjectionContext(injector, () => params.requestFn(input))).pipe(
        tap((response) => {
          params.store?.setRequestStatus && params.store.setRequestStatus('Success');

          runInInjectionContext(injector, () => {
            params.onSuccess && params.onSuccess(response, input);
            params.store?.setError && params.store.setError(null);
          });
        }),
        catchPgError((error) => {
          runInInjectionContext(injector, () => {
            params.onError && params.onError(error, input);
            handleError(error, params.errorHandler);
          });

          params.store?.setError && params.store.setError(error);
          params.store?.setRequestStatus && params.store.setRequestStatus('Failed');
        }),
      ),
    ),
  );

  return rxMethod<Input>(params.once ? pipe(pipeline, take(1)) : pipeline);
};

export interface FetchEntitiesParams<Entity, Input = void> extends RxRequestParams<Input, Entity[]> {
  store: RxRequestParams<Input, Entity[]>['store'] & {
    setAllEntities(collection: Entity[]): void;
  };
}

export const fetchEntities = <Entity, Input = void>(params: FetchEntitiesParams<Entity, Input>) => {
  return rxRequest<Input, Entity[]>({
    ...params,
    requestFn: (input) =>
      from(params.requestFn(input)).pipe(
        tap((collection) => {
          params.store.setAllEntities(collection);
        }),
      ),
  });
};

export interface FetchDataParams<Data, Input = void> extends RxRequestParams<Input, Data> {
  store: RxRequestParams<Input, Data>['store'] & {
    setData(collection: Data): void;
  };
}

export const fetchData = <Data, Input = void>(params: FetchDataParams<Data, Input>) => {
  return rxRequest<Input, Data>({
    ...params,
    requestFn: (input) =>
      from(params.requestFn(input)).pipe(
        tap((data) => {
          params.store.setData(data);
        }),
      ),
  });
};

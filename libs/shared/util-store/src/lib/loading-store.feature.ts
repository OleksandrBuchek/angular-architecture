import { HttpErrorResponse } from '@angular/common/http';
import { Signal, computed } from '@angular/core';
import { PGError } from '@shared/util-error-handling';
import { RequestStatus } from './request-status-store.feature';
import { SignalStoreFeature, signalStoreFeature, type, withComputed } from '@ngrx/signals';
import {
  SignalStoreFeatureResult,
  SignalStoreSlices,
  EmptyFeatureResult,
  InnerSignalStore,
} from '@ngrx/signals/src/signal-store-models';
import { Prettify } from '@ngrx/signals/src/ts-helpers';
import { DataLoadingState, LoadingState } from '@shared/util-loading-state';

interface GetLoadingStateParams {
  error: Signal<PGError<HttpErrorResponse> | null>;
  requestStatus: Signal<RequestStatus>;
}

interface GetDataLoadingStateParams<TEntity> extends GetLoadingStateParams {
  data: Signal<TEntity>;
}

const getDataLoadingState = <TData>(store: GetDataLoadingStateParams<TData>): Signal<DataLoadingState<TData>> =>
  computed(() => {
    const error = store.error();
    const status = store.requestStatus();

    const result =
      status === 'Success' ? { status, data: store.data() } : status === 'Failed' ? { status, error } : { status };

    return result as DataLoadingState<TData>;
  });

const getLoadingState = (store: GetLoadingStateParams): Signal<LoadingState> =>
  computed(() => {
    const error = store.error();
    const status = store.requestStatus();

    const result = status === 'Success' ? { status } : status === 'Failed' ? { status, error } : { status };

    return result as LoadingState;
  });

export const withDataLoadingState = <Input extends SignalStoreFeatureResult, TEntity>(
  storeSliceSelector: (
    store: Prettify<SignalStoreSlices<Input['state']> & Input['signals']>,
  ) => GetDataLoadingStateParams<TEntity>,
): SignalStoreFeature<Input, EmptyFeatureResult & { signals: { loadingState: Signal<DataLoadingState<TEntity>> } }> => {
  return (store) => {
    const storeSlice = storeSliceSelector({ ...store.slices, ...store.signals });

    const loadingState = getDataLoadingState(storeSlice);

    return {
      ...store,
      signals: {
        ...store.signals,
        loadingState,
      },
    } as InnerSignalStore<object, { loadingState: Signal<DataLoadingState<TEntity>> }>;
  };
};

export const withLoadingState = () => {
  return signalStoreFeature(
    {
      state: type<{
        error: PGError<HttpErrorResponse> | null;
        requestStatus: RequestStatus;
      }>(),
    },
    withComputed((store) => ({
      loadingState: getLoadingState(store),
    })),
  );
};

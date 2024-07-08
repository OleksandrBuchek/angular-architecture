import { patchState, signalStoreFeature, withState, withMethods, signalStore } from '@ngrx/signals';
import { withRequestStatus } from './request-status-store.feature';
import { withError } from './error-store.feature';
import { withDataLoadingState } from './loading-store.feature';
import { createInstance } from '@shared/util-helpers';

export function withData<TEntity>(defaultValue: TEntity) {
  return signalStoreFeature(
    withState<{ data: TEntity }>({ data: defaultValue }),
    withMethods((store) => ({
      setData(data: TEntity) {
        patchState(store, { data });
      },
      clearData() {
        patchState(store, { data: defaultValue });
      },
    })),
  );
}

export const dataStore = <TEntity>(defaultValue: TEntity) => {
  return createInstance(
    signalStore(
      withData<TEntity>(defaultValue),
      withRequestStatus(),
      withError(),
      withDataLoadingState((store) => store),
    ),
  );
};

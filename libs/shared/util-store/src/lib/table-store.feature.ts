import { patchState, signalStoreFeature, withMethods, withState } from '@ngrx/signals';
import { SortingInput, withSorting } from './sorting-store.feature';
import { withPagination } from './pagination-store.feature';
import { withRequestStatus } from './request-status-store.feature';
import { withError } from './error-store.feature';

export const withTable = <ColumnKey extends string>(params?: SortingInput<ColumnKey>) => {
  return signalStoreFeature(
    withSorting<ColumnKey>(params),
    withPagination(),
    withRequestStatus(),
    withError(),
    withState<{ currentNumberOfItems: number; totalItems: number }>({ currentNumberOfItems: 0, totalItems: 0 }),
    withMethods((store) => ({
      setCurrentNumberOfItems(currentNumberOfItems: number): void {
        patchState(store, { currentNumberOfItems });
      },
      setTotalItems(totalItems: number): void {
        patchState(store, { totalItems });
      },
    })),
  );
};

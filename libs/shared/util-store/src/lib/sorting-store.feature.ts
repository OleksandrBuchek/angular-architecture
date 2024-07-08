import { signalStoreFeature, withState, withMethods, patchState } from '@ngrx/signals';

export type SortDirection = 'asc' | 'desc';

export interface Sorting<TColumnKey extends string = string> {
  column: TColumnKey;
  direction: SortDirection;
}

export type SortingInput<ColumnKey extends string> =
  | (Pick<Sorting<ColumnKey>, 'column'> & Partial<Pick<Sorting<ColumnKey>, 'direction'>>)
  | null;

export const withSorting = <ColumnKey extends string>(override?: SortingInput<ColumnKey>) => {
  const initialState: Sorting<ColumnKey> | null = override ? { direction: 'asc', ...override } : null;

  return signalStoreFeature(
    withState<{ sorting: Sorting<ColumnKey> | null }>({ sorting: initialState }),
    withMethods((store) => ({
      setSorting(sorting: Sorting<ColumnKey> | null): void {
        patchState(store, { sorting });
      },
      sortBy(column: ColumnKey): void {
        const currentSorting = store.sorting();

        if (!currentSorting || currentSorting.column !== column) {
          return this.setSorting({ column, direction: 'asc' });
        }

        if (currentSorting.column === column && currentSorting.direction === 'asc') {
          return this.setSorting({ column, direction: 'desc' });
        }

        if (currentSorting.column === column && currentSorting.direction === 'desc') {
          return this.setSorting(null);
        }
      },
    })),
  );
};

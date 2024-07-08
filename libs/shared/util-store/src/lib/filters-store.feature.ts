import { signalStoreFeature, withState, withMethods, patchState } from '@ngrx/signals';

export function withFilters<TFilters extends object>(defaultValue: TFilters) {
  return signalStoreFeature(
    withState<{ filters: TFilters }>({ filters: defaultValue }),
    withMethods((store) => ({
      setFilters(filters: TFilters) {
        patchState(store, { filters });
      },
      patchFilters(newValue: Partial<TFilters>) {
        const currentValue = store.filters();

        patchState(store, { filters: { ...currentValue, ...newValue } });
      },
      clearFilters() {
        patchState(store, { filters: defaultValue });
      },
    })),
  );
}

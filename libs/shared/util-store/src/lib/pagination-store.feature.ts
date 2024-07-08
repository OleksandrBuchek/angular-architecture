import { signalStoreFeature, withState, withMethods, patchState } from '@ngrx/signals';

export interface Pagination {
  limit: number;
  offset: number;
}

const PAGINATION_DEFAULT: Pagination = {
  limit: 100,
  offset: 0,
};

const OFFSET_MIN = 0;

export function withPagination(override: Partial<Pagination> = PAGINATION_DEFAULT) {
  return signalStoreFeature(
    withState<{ pagination: Pagination; isLastPage: boolean }>({
      pagination: { ...PAGINATION_DEFAULT, ...override },
      isLastPage: false,
    }),
    withMethods((store) => ({
      setIsLastPage(isLastPage: boolean): void {
        patchState(store, { isLastPage });
      },
      setItemsPerPage(limit: number): void {
        patchState(store, { pagination: { ...store.pagination(), limit } });
      },
      toFirstPage(): void {
        patchState(store, { pagination: { ...store.pagination(), offset: 0 } });
      },
      goToPage(page: number): void {
        patchState(store, { pagination: { ...store.pagination(), offset: store.pagination.limit() * page } });
      },
      nextPage(): void {
        patchState(store, {
          pagination: { ...store.pagination(), offset: store.pagination.offset() + store.pagination.limit() },
        });
      },
      previousPage(): void {
        patchState(store, {
          pagination: {
            ...store.pagination(),
            offset: Math.max(store.pagination.offset() - store.pagination.limit(), OFFSET_MIN),
          },
        });
      },
    })),
  );
}

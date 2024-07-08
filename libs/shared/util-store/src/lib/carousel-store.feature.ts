import { computed, effect } from '@angular/core';
import { patchState, signalStoreFeature, withState, withMethods, withComputed, withHooks, type } from '@ngrx/signals';

export const withCarousel = <TEntity>() => {
  return signalStoreFeature(
    { state: type<{ entities: TEntity[] }>() },
    withState<{ currentCarouselItemIndex: number }>({ currentCarouselItemIndex: 0 }),
    withMethods((store) => ({
      nextCarouselPage(): void {
        const nextPageIndex =
          store.currentCarouselItemIndex() + 1 < store.entities().length ? store.currentCarouselItemIndex() + 1 : 0;

        patchState(store, { currentCarouselItemIndex: nextPageIndex });
      },
      previousCarouselPage(): void {
        const nextPageIndex =
          store.currentCarouselItemIndex() - 1 >= 0
            ? store.currentCarouselItemIndex() - 1
            : store.entities().length - 1;

        patchState(store, { currentCarouselItemIndex: nextPageIndex });
      },
    })),
    withComputed((store) => ({
      activeCarouselItem: computed(() => store.entities()[store.currentCarouselItemIndex()] ?? null),
    })),
    withHooks((store) => ({
      onInit: () => {
        effect(
          () => {
            store.entities();
            patchState(store, { currentCarouselItemIndex: 0 });
          },
          { allowSignalWrites: true },
        );
      },
    })),
  );
};

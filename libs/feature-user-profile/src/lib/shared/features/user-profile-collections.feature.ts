import { simpleEntitiesStore } from '@shared/util-store';
import { Country } from '../../models';
import { Provider, computed, inject } from '@angular/core';
import { fetchEntities } from '@shared/util-rxjs-interop';
import { CountriesApi } from '../../data-access';
import { createInjectionToken } from '@shared/util-di';

export const UserProfileCollectionsRepository = createInjectionToken(() => {
  const countriesStore = simpleEntitiesStore<Country>();

  const countries = countriesStore.entities;

  const countriesUIOptions = computed(() =>
    countries().map(({ id, name }) => ({
      value: id,
      label: name,
    })),
  );

  return {
    countries,
    countriesLoadingState: countriesStore.loadingState,
    countriesStore,
    countriesUIOptions,
  };
});

export const UserProfileCollectionsEffects = createInjectionToken(
  (
    repository: typeof UserProfileCollectionsRepository.type = UserProfileCollectionsRepository.inject(),
    countriesApi: CountriesApi = inject(CountriesApi),
  ) => {
    const fetchCountries = fetchEntities<Country>({
      requestFn: () => countriesApi.fetchCountries(),
      store: repository.countriesStore,
    });

    return {
      fetchCountries,
    };
  },
);

export const UserProfileCollectionsFeatureFacade = createInjectionToken(
  (
    repo: typeof UserProfileCollectionsRepository.type = UserProfileCollectionsRepository.inject(),
    effects: typeof UserProfileCollectionsEffects.type = UserProfileCollectionsEffects.inject(),
  ) => ({
    countriesUIOptions: repo.countriesUIOptions,
    fetchCountries: effects.fetchCountries,
    collectionsLoadingState: repo.countriesStore.loadingState,
  }),
);

export const provideUserProfileCollectionsFeature = (): Provider[] => [
  UserProfileCollectionsRepository.provide(),
  UserProfileCollectionsEffects.provide(),
  UserProfileCollectionsFeatureFacade.provide(),
];

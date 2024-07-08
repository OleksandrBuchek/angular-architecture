import { InjectionToken, Provider, Type } from '@angular/core';

export type TypedInjectableProvider<T> =
  | { useValue: T }
  | { useExisting: InjectionToken<T> | Type<T> }
  | { useClass: Type<T> }
  | { useFactory: () => T };

const isProviderWithToken = (provider: Provider): provider is { provide: any } => 'provide' in provider;

const isSameProvider = <T>(provider: Provider, tokenOrType: InjectionToken<T> | Type<T>): boolean =>
  isProviderWithToken(provider) ? provider.provide === tokenOrType : provider === tokenOrType;

const createProvider = <T>([tokenOrType, value]: [
  tokenOrType: InjectionToken<T> | Type<T>,
  value: TypedInjectableProvider<T>,
]): Provider => ({
  provide: tokenOrType,
  ...value,
});

export const overrideProviders =
  <T>(...overrides: Array<[InjectionToken<T> | Type<T>, TypedInjectableProvider<T>]>) =>
  (providers: Provider[]): Provider[] => {
    const flatProvidersList = providers.flat() as Provider[];

    return flatProvidersList.reduce((acc: Provider[], provider) => {
      const override = overrides.find(([tokenOrType]) => isSameProvider(provider, tokenOrType));

      return override ? [...acc, createProvider(override)] : [...acc, provider];
    }, [] as Provider[]);
  };

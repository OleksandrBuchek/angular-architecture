import { InjectionToken, Provider, inject as ngInject } from '@angular/core';
import { TypedInjectableProvider } from './override-provider';

type CreateInjectionTokenOptions<T> = {
  description: string;
  isRoot: boolean;
} & (
  | {
      overrideResolver: (self: T, override: Partial<T>) => T;
      allowPartialOverride: true;
    }
  | {
      overrideResolver: (self: T, override: T) => T;
      allowPartialOverride: false;
    }
);

type CreateInjectionTokenResult<
  FactoryFn extends (...args: any[]) => any,
  Options extends Partial<CreateInjectionTokenOptions<ReturnType<FactoryFn>>>,
> = {
  provide: (...params: Parameters<FactoryFn>) => Provider;
  create: FactoryFn;
  inject: () => ReturnType<FactoryFn>;
  token: InjectionToken<ReturnType<FactoryFn>>;
  type: ReturnType<FactoryFn>;
  override: Options['allowPartialOverride'] extends true
    ? (overrideProvider: TypedInjectableProvider<Partial<ReturnType<FactoryFn>>>) => Provider
    : (overrideProvider: TypedInjectableProvider<ReturnType<FactoryFn>>) => Provider;
};

const injectOverride = <T>(token: InjectionToken<T>) => ngInject(token, { skipSelf: true, optional: true });

const mergeWithDefaultOptions = <T>(
  override: Partial<CreateInjectionTokenOptions<T>>,
): CreateInjectionTokenOptions<T> => ({
  description: '',
  isRoot: false,
  allowPartialOverride: false,
  overrideResolver: (self: T) => self,
  ...override,
});

export const createInjectionToken = <
  FactoryFn extends (...args: any[]) => any,
  Options extends Partial<CreateInjectionTokenOptions<ReturnType<FactoryFn>>>,
>(
  create: FactoryFn,
  options: Options = {} as Options,
): CreateInjectionTokenResult<FactoryFn, Options> => {
  type Type = ReturnType<FactoryFn>;

  const { description, isRoot, overrideResolver }: CreateInjectionTokenOptions<Type> = mergeWithDefaultOptions(options);

  const tokenOptions = isRoot ? { provideIn: 'root', factory: () => create() } : undefined;

  const token = new InjectionToken<Type>(description, tokenOptions);

  const provide = (...params: Parameters<FactoryFn>): Provider => ({
    provide: token,
    useFactory: () => {
      const self = create(...params);
      const override = injectOverride(token);

      return override ? overrideResolver(self, override) : self;
    },
  });

  const inject = () => ngInject(token);

  const override = (overrideProvider: TypedInjectableProvider<Partial<Type> | Type>): Provider => ({
    provide: token,
    ...overrideProvider,
  });

  return {
    provide,
    create,
    override,
    inject,
    token,
    type: {} as Type,
  };
};

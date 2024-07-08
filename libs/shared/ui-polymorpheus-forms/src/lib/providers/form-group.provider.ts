import { Provider, inject, InjectionToken, computed, signal } from '@angular/core';
import { FormArray, FormGroup, isFormArray, isFormGroup } from '@angular/forms';
import { buildFormGroup, isFormArrayConfig, isFormGroupConfig } from '../utils/form-builder.util';
import { FormFieldNameDirective } from '../directives';
import { FormGroupConfig } from '../models';
import { memoUntilDestroyedDeferred, memoWithParamsUntilDestroyedDeferred } from '@shared/util-memoization';
import { ValueOrFactory } from '@shared/util-types';
import { getValue } from '@shared/util-helpers';
import { get, isNumber } from 'lodash-es';
import { FormGroupFacade } from '../facades';

export const FORM_GROUP_REF = new InjectionToken<FormGroup>('FORM_GROUP_REF');

export const injectFormGroup = <Form extends FormGroup | FormArray>() => inject<Form>(FORM_GROUP_REF);

const toFormGroupConfigPath = (path: string): string => path.split('.').join('.controls.');

const findConfig = <Form extends FormGroup>(
  parentFacade: FormGroupFacade<FormGroup<any>>,
  formFieldNameDirective: FormFieldNameDirective<Form, keyof Form['controls']>,
) => {
  const configPath = toFormGroupConfigPath(formFieldNameDirective.name() as string);

  const config = get(parentFacade.$config()?.controls ?? {}, configPath) as
    | Parameters<typeof isFormArrayConfig>[number]
    | undefined;

  const formArrayItemIndex = formFieldNameDirective.formArrayItemIndex();

  if (config && isFormArrayConfig(config) && isNumber(formArrayItemIndex)) {
    return config.controls as FormGroupConfig<FormGroup>;
  }

  if (config && isFormGroupConfig(config)) {
    return config as FormGroupConfig<FormGroup>;
  }

  return undefined;
};

const findFormGroup = <Form extends FormGroup>(
  parentFacade: FormGroupFacade<FormGroup<any>>,
  formFieldNameDirective: FormFieldNameDirective<Form, keyof Form['controls']>,
): Form | undefined => {
  const formArrayItemIndex = formFieldNameDirective.formArrayItemIndex();

  const form = parentFacade.$form()?.get(formFieldNameDirective.name() as string) as Form | undefined;

  if (isFormArray(form) && isNumber(formArrayItemIndex)) {
    return form.at(formArrayItemIndex) as Form;
  }

  if (isFormGroup(form)) {
    return form;
  }

  return undefined;
};

const injectFormFieldNameDirective = <Form extends FormGroup>() => {
  return inject<FormFieldNameDirective<Form, keyof Form['controls']>>(FormFieldNameDirective, {
    optional: true,
  });
};

const getParentFacade = <Form extends FormGroup>(
  formFieldNameDirective: FormFieldNameDirective<
    Form,
    keyof Form['controls']
  > | null = injectFormFieldNameDirective<Form>(),
) => {
  const parentFacade = inject(FormGroupFacade, { skipSelf: true, optional: true });

  if (parentFacade && formFieldNameDirective) {
    const config = computed(() => findConfig(parentFacade, formFieldNameDirective));

    const form = computed(() => findFormGroup(parentFacade, formFieldNameDirective));

    return new FormGroupFacade({ config, form });
  }

  if (parentFacade) {
    return parentFacade;
  }

  return null;
};

export const provideFormGroup = <Form extends FormGroup>(
  configOrFactory: ValueOrFactory<FormGroupConfig<Form>>,
): Provider[] => {
  const getConfigMemoized = memoUntilDestroyedDeferred(() => getValue(configOrFactory));
  const getParentFacadeMemoized = memoWithParamsUntilDestroyedDeferred(() => getParentFacade(), {
    resolver: () => injectFormFieldNameDirective<Form>() ?? '',
  });

  return [
    {
      provide: FORM_GROUP_REF,
      useFactory: () => getParentFacadeMemoized()?.$form() ?? buildFormGroup<Form>(getConfigMemoized()),
    },
    {
      provide: FormGroupFacade,
      useFactory: () => {
        const parentFacade = getParentFacadeMemoized();

        if (parentFacade) {
          return parentFacade;
        }

        const configDefault = signal(getConfigMemoized());

        const form = signal(injectFormGroup<Form>());

        return new FormGroupFacade({ config: configDefault, form, isRoot: true });
      },
    },
  ];
};

export const ROOT_FORM_GROUP_REF = new InjectionToken<FormGroup>('ROOT_FORM_GROUP_REF');

export const injectFormGroupRoot = <Form extends FormGroup>() => inject<Form>(ROOT_FORM_GROUP_REF);

export const provideFormGroupRoot = <Form extends FormGroup>(
  configOrFactory: ValueOrFactory<FormGroupConfig<Form>>,
): Provider[] => {
  const getConfigMemoized = memoUntilDestroyedDeferred(() => getValue(configOrFactory));

  return [
    {
      provide: ROOT_FORM_GROUP_REF,
      useFactory: () => buildFormGroup<Form>(getConfigMemoized()),
    },
    {
      provide: FORM_GROUP_REF,
      useExisting: ROOT_FORM_GROUP_REF,
    },
    {
      provide: FormGroupFacade,
      useFactory: () => {
        const form = signal(injectFormGroupRoot<Form>());

        return new FormGroupFacade({ config: signal(getConfigMemoized()), form, isRoot: true });
      },
    },
  ];
};

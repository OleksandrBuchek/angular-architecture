import { computed, inject, Signal } from '@angular/core';
import { UIOptionAsync } from '@shared/util-types';
import { WithOptions } from '../models';
import { injectControlConfig } from './control-config.injector';
import { FormGroup } from '@angular/forms';
import { FormGroupFacade } from '../facades';
import { asSignal } from '@shared/util-rxjs-interop';
import { isFactoryFunction } from '@shared/util-helpers';
import { createUIOptionAsyncMapper } from '@shared/util-forms';

export const injectFieldOptions = <Form extends FormGroup>(): Signal<UIOptionAsync<unknown>[]> => {
  const facade = inject<FormGroupFacade<Form>>(FormGroupFacade);
  const toAsyncOption = createUIOptionAsyncMapper();

  const optionsOrFactory: WithOptions<Form>['options'] = (
    (injectControlConfig().props ?? { options: [] }) as WithOptions<Form>
  ).options;

  const options = isFactoryFunction(optionsOrFactory) ? optionsOrFactory(facade.form) : optionsOrFactory;

  const $options = asSignal(options, { initialValue: [] });

  return computed(() => $options().map((option) => toAsyncOption(option)));
};

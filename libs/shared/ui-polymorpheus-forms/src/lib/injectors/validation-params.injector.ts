import { FormGroup } from '@angular/forms';
import { FormControlValidationParams, FormFieldConfigBase, ValidationParams } from '../models';
import { getValidationWithParams, getValidationParamsSignals } from '../utils';
import { injectControlConfig } from './control-config.injector';
import { AsSignals } from '@shared/util-types';
import { NULLABLE_VALIDATION_PARAMS } from '../constants';

export const injectValidationParams = <
  Form extends FormGroup,
  Key extends keyof Form['controls'],
  Params extends ValidationParams,
>(): FormControlValidationParams<Params> => {
  const config = injectControlConfig<Form, Key>();

  const validation = getValidationWithParams(config as FormFieldConfigBase<Form>);

  const params = getValidationParamsSignals(validation.params, NULLABLE_VALIDATION_PARAMS);
  const deferredParams = getValidationParamsSignals(validation.deferredParams, {});

  return { params, deferredParams } as FormControlValidationParams<Params>;
};

export const injectTemplateValidationParams = <
  Form extends FormGroup,
  Key extends keyof Form['controls'],
  Params extends ValidationParams,
>(): AsSignals<Params> => {
  const { params, deferredParams } = injectValidationParams<Form, Key, Params>();

  return {
    ...params,
    ...deferredParams,
  };
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbstractControl, AbstractControlOptions, FormArray, FormControl, FormGroup } from '@angular/forms';

import { objectEntries } from '@shared/util-object';

import { FormControlConfig } from '../models/form-control-config.model';
import { FormArrayConfig, FormFieldConfigBase, FormGroupConfig } from '../models';
import { getValidationWithParams } from './get-validation-with-params.util';
import { getValidationParamsSignals } from './validation.util';
import { VALIDATION_PARAMS_DEFAULT } from '../constants';

export const isFormControlConfig = (
  config: FormGroupConfig<any> | FormArrayConfig<any> | FormControlConfig<any, any>,
): config is FormControlConfig<any, any> => {
  return !('controls' in config) && 'type' in config;
};

export const isFormArrayConfig = (
  config: FormGroupConfig<any> | FormArrayConfig<any> | FormControlConfig<any, any>,
): config is FormArrayConfig<any> => {
  return 'controls' in config && 'isArray' in config;
};

export const isFormGroupConfig = (
  config: FormGroupConfig<any> | FormArrayConfig<any> | FormControlConfig<any, any>,
): config is FormGroupConfig<any> => {
  return 'controls' in config && !('isArray' in config);
};

export const buildValidators = (config: FormFieldConfigBase<any>): AbstractControlOptions => {
  const validation = getValidationWithParams(config);

  const paramsSignals = getValidationParamsSignals(validation.params, VALIDATION_PARAMS_DEFAULT);

  const validators = validation?.validators ? validation?.validators(paramsSignals) : null;

  const asyncValidators = validation?.asyncValidators ? validation?.asyncValidators(paramsSignals) : null;

  return {
    validators,
    asyncValidators,
  };
};

export const buildControl = (
  config: FormGroupConfig<any> | FormArrayConfig<any> | FormControlConfig<any, any>,
): AbstractControl => {
  return isFormGroupConfig(config)
    ? buildFormGroup(config)
    : isFormArrayConfig(config)
      ? buildFormArray(config)
      : buildFormControl(config);
};

export const buildFormControl = <Form extends FormGroup, Key extends keyof Form['controls']>(
  config: FormControlConfig<Form, Key>,
): Form['controls'][Key] => {
  return new FormControl(config.defaultValue, {
    ...buildValidators(config as FormFieldConfigBase<any>),
    nonNullable: config.nonNullable ?? true,
  }) as unknown as Form['controls'][Key];
};

export const buildFormArray = <Form extends FormArray>(config: FormArrayConfig<Form>): Form => {
  const controls: AbstractControl[] = ((config.defaultValue || []) as unknown[]).map(() =>
    buildControl(config.controls as any),
  );

  return new FormArray(controls, buildValidators(config as FormFieldConfigBase<any>)) as Form;
};

export const buildFormGroup = <Form extends FormGroup>(config: FormGroupConfig<Form>): Form => {
  const controls = objectEntries(config.controls).reduce(
    (acc, [key, subConfig]) => ({
      ...acc,
      [key]: buildControl(subConfig as FormGroupConfig<any> | FormArrayConfig<any> | FormControlConfig<any, any>),
    }),
    {} as FormGroup['controls'],
  );

  return new FormGroup(controls, buildValidators(config as FormFieldConfigBase<any>)) as Form;
};

import { Observable, combineLatest, map } from 'rxjs';
import { injectControlConfig } from './control-config.injector';
import { getValidationParamsChanges, getValidationWithParams } from '../utils';
import { FormControlConfigValidationWithParams, FormFieldConfigBase, FormValidationParams } from '../models';
import { FormGroup } from '@angular/forms';
import { injectFieldControl } from './control.injector';
import { controlValue } from '@shared/util-forms';
import { objectEntries, objectKeys } from '@shared/util-object';
import { injectTemplateValidationParams, injectValidationParams } from './validation-params.injector';
import { asObservable } from '@shared/util-rxjs-interop';
import { FormValidationMessagesFactory } from '../providers';

const getErrorMessagesDefault = (): (() => ReturnType<typeof FormValidationMessagesFactory.type>) => {
  const params = injectTemplateValidationParams<FormGroup, string, FormValidationParams>();
  const validationMessagesFactory = FormValidationMessagesFactory.inject();

  return () => validationMessagesFactory(params);
};

const getErrorMessagesChanges = <Form extends FormGroup, Key extends keyof Form['controls']>(): Observable<
  Record<string, Observable<string>>
> => {
  const config = injectControlConfig<Form, Key>() as FormFieldConfigBase<Form>;
  const defaultMessagesFactory = getErrorMessagesDefault();
  const customMessagesFactory: FormControlConfigValidationWithParams<Form, Key>['messages'] =
    getValidationWithParams(config).messages ?? (() => ({}));

  const { params, deferredParams } = injectValidationParams();

  return getValidationParamsChanges(config).pipe(
    map(() => ({ ...defaultMessagesFactory(), ...customMessagesFactory({ params, deferredParams }) })),
    map((messages) =>
      objectEntries(messages).reduce(
        (acc, [key, messageOrObservable]) => ({ ...acc, [key]: asObservable(messageOrObservable) }),
        {},
      ),
    ),
  );
};

export const injectErrorMessages = <Form extends FormGroup, Key extends keyof Form['controls']>(): Observable<
  Array<{ key: string; message$: Observable<string> }>
> => {
  const control = injectFieldControl<Form, Key>();

  return combineLatest([getErrorMessagesChanges(), controlValue(control)]).pipe(
    map(([messages]) => {
      return objectKeys(control.errors ?? {}).reduce(
        (acc, key) => [...acc, { key, message$: messages[key] }],
        [] as Array<{ key: string; message$: Observable<string> }>,
      );
    }),
  );
};

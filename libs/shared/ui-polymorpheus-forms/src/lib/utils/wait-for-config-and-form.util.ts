import { FormGroup } from '@angular/forms';
import { FormGroupFacadeParamsBase, FormGroupConfig } from '../models';
import { asObservable } from '@shared/util-rxjs-interop';
import { filter } from 'rxjs';
import { computed } from '@angular/core';

export const waitForConfigAndForm = <Form extends FormGroup>(params: FormGroupFacadeParamsBase<Form>) =>
  asObservable(computed(() => ({ config: params.config(), form: params.form() }))).pipe(
    filter((params): params is { form: Form; config: FormGroupConfig<Form> } => Boolean(params.config && params.form)),
  );

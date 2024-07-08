/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injector, runInInjectionContext } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { distinctUntilChanged, map, merge, Observable, switchMap, tap } from 'rxjs';

import { controlValue } from '@shared/util-forms';
import { objectEntries } from '@shared/util-object';

import { isEqual } from '@shared/util-helpers';
import {
  FormFieldConfigActionsMap,
  FormGroupConfig,
  FormGroupFacadeParamsBase,
  OnChangeAsyncFn,
  OnChangeFn,
  SubFormFieldConfig,
} from '../models';
import { getFormForConfig, waitForConfigAndForm } from '../utils';

interface FormGroupValueChangesManagerParams<Form extends FormGroup> extends FormGroupFacadeParamsBase<Form> {
  injector: Injector;
}

export class FormGroupValueChangesManager<Form extends FormGroup> {
  readonly valueChanges$: Observable<void>;

  constructor(private readonly params: Readonly<FormGroupValueChangesManagerParams<Form>>) {
    this.valueChanges$ = this.getValueChanges();
  }

  getValueChanges(): Observable<void> {
    return waitForConfigAndForm(this.params).pipe(
      switchMap(({ form, config }) => {
        const changes$ = objectEntries(config.controls).map(([key, config]) =>
          this.getValueChangesFor(config, form.get(key)!, getFormForConfig(form, key) as Form),
        );

        if (this.params.isRoot) {
          changes$.push(this.getValueChangesFor(config, form, form));
        }

        return merge(...changes$);
      }),
    );
  }

  private getValueChangesFor(
    config: SubFormFieldConfig<Form> | FormGroupConfig<Form>,
    control: AbstractControl,
    form: Form,
  ): Observable<void> {
    const { onChange, onChangeAsync } = this.getActionsMap(config);

    const controlValueChanges$ = controlValue(control).pipe(
      distinctUntilChanged(isEqual),
      tap((formValue) => {
        onChange(formValue, form);
      }),
    );

    const changes$ = runInInjectionContext(this.params.injector, () => onChangeAsync(controlValueChanges$, form));

    return changes$.pipe(map(() => undefined));
  }

  private getActionsMap(config: SubFormFieldConfig<Form> | FormGroupConfig<Form>): FormFieldConfigActionsMap<Form> {
    const onChange = (config.actions?.onChange ?? (() => undefined)) as OnChangeFn<Form>;
    const onChangeAsync = (config.actions?.onChangeAsync ??
      ((state$: Observable<Form['value']>) => state$)) as OnChangeAsyncFn<Form>;

    return {
      onChange,
      onChangeAsync,
    };
  }
}

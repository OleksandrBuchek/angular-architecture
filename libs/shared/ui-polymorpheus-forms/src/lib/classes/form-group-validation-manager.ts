/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injector, runInInjectionContext } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { combineLatest, map, merge, Observable, switchMap, tap } from 'rxjs';

import { objectEntries } from '@shared/util-object';
import { VALIDATION_PARAMS_DEFAULT } from '../constants';
import { FormGroupFacadeParamsBase, SubFormFieldConfig, FormGroupConfig, FormFieldConfigBase } from '../models';
import {
  waitForConfigAndForm,
  getFormForConfig,
  getValidationWithParams,
  getValidationParamsChanges,
  getValidationParamsSignals,
} from '../utils';

interface FormGroupValidationManagerParams<Form extends FormGroup> extends FormGroupFacadeParamsBase<Form> {
  injector: Injector;
}

export class FormGroupValidationManager<Form extends FormGroup> {
  readonly validityChanges$: Observable<void>;

  constructor(private readonly params: Readonly<FormGroupValidationManagerParams<Form>>) {
    this.validityChanges$ = merge(this.buildDeferredValidators(), this.getValidityChanges());
  }

  getValidityChanges(): Observable<void> {
    return waitForConfigAndForm(this.params).pipe(
      switchMap(({ form, config }) => {
        const changes$ = objectEntries(config.controls).map(([key, config]) =>
          this.getValidityChangesFor(config, form.get(key)!, getFormForConfig(form, key) as Form),
        );

        if (this.params.isRoot) {
          changes$.push(this.getValidityChangesFor(config, form, form));
        }

        return merge(...changes$);
      }),
    );
  }

  getValidityChangesFor(
    config: SubFormFieldConfig<Form> | FormGroupConfig<Form>,
    control: AbstractControl,
    form: Form,
  ): Observable<void> {
    const changes$ = this.getValidityTriggerChanges(config, form).pipe(
      tap(() => {
        control.updateValueAndValidity();
      }),
    );

    return changes$.pipe(map(() => undefined));
  }

  private getValidityTriggerChanges(
    config: SubFormFieldConfig<Form> | FormGroupConfig<Form>,
    form: Form,
  ): Observable<void> {
    const validation = getValidationWithParams(config as FormFieldConfigBase<Form>);

    const changes$: Array<Observable<void | unknown>> = [
      runInInjectionContext(this.params.injector, () =>
        getValidationParamsChanges(config as FormFieldConfigBase<Form>),
      ),
    ];

    if (validation.triggerOn) {
      changes$.push(runInInjectionContext(this.params.injector, () => validation.triggerOn!(form)));
    }

    return combineLatest(changes$).pipe(map(() => undefined));
  }

  private buildDeferredValidators(): Observable<void> {
    return waitForConfigAndForm(this.params).pipe(
      tap(({ config, form }) => {
        objectEntries(config.controls)
          .filter(([_, config]) => this.hasDeferredValdiators(config as FormFieldConfigBase<Form>))
          .forEach(([key, config]) => {
            this.buildDeferredValidatorsFor(config, form.get(key)!, getFormForConfig(form, key) as Form);
          });

        if (this.params.isRoot && this.hasDeferredValdiators(config)) {
          this.buildDeferredValidatorsFor(config, form, form);
        }
      }),
      map(() => undefined),
    );
  }

  private buildDeferredValidatorsFor(
    config: SubFormFieldConfig<Form> | FormGroupConfig<Form>,
    control: AbstractControl,
    form: Form,
  ): void {
    const validation = getValidationWithParams(config as FormFieldConfigBase<Form>);

    const validatorsFactory = validation?.deferredValidators || (() => []);
    const asyncValidatorsFactory = validation?.deferredAsyncValidators || (() => []);

    const params = runInInjectionContext(this.params.injector, () =>
      getValidationParamsSignals(validation.params, VALIDATION_PARAMS_DEFAULT),
    );

    const deferredParams = runInInjectionContext(this.params.injector, () =>
      getValidationParamsSignals(validation.deferredParams, VALIDATION_PARAMS_DEFAULT),
    );

    control?.addValidators(
      runInInjectionContext(this.params.injector, () => validatorsFactory({ params, deferredParams, form })),
    );

    control?.addAsyncValidators(
      runInInjectionContext(this.params.injector, () => asyncValidatorsFactory({ params, deferredParams, form })),
    );

    control?.updateValueAndValidity();
  }

  private hasDeferredValdiators(config: FormFieldConfigBase<Form>): boolean {
    return Boolean(config.validation?.deferredValidators || config.validation?.deferredAsyncValidators);
  }
}

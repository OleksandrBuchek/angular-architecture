/* eslint-disable @angular-eslint/directive-selector */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { DestroyRef, Injector, Signal, computed, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, isFormArray } from '@angular/forms';
import { merge } from 'rxjs';
import { ensureValue } from '@shared/util-helpers';

import { memoUntilDestroyed } from '@shared/util-memoization';
import { FormGroupConfig, FormGroupFacadeParamsBase } from '../../models';
import { buildControl, isFormArrayConfig } from '../../utils';
import {
  FormFieldIdGenerator,
  FormGroupLifecycleHooksManager,
  FormGroupStatesManager,
  FormGroupValidationManager,
  FormGroupValueChangesManager,
} from '../../classes';
import { objectKeys } from '@shared/util-object';

interface FormGroupFacadeParams<Form extends FormGroup>
  extends FormGroupFacadeParamsBase<Form> {
  isRoot?: boolean;
}

export class FormGroupFacade<Form extends FormGroup> {
  public readonly $form: Signal<Form | undefined>;
  public readonly $config: Signal<FormGroupConfig<Form> | undefined>;

  public readonly $fieldNames = computed(() =>
    objectKeys(this.$config()?.controls ?? ({} as Form['controls']))
  );

  public get form(): Form {
    return ensureValue(this.params.form);
  }

  public get config(): FormGroupConfig<Form> {
    return ensureValue(this.params.config);
  }

  public readonly ids: FormFieldIdGenerator<Form>;

  private readonly injector = inject(Injector);
  private readonly destroyRef = inject(DestroyRef);

  private readonly statesManager: FormGroupStatesManager<Form>;
  private readonly validationManager: FormGroupValidationManager<Form>;
  private readonly valueChangesManager: FormGroupValueChangesManager<Form>;
  private readonly lifecycleHooksManager: FormGroupLifecycleHooksManager<Form>;

  private readonly getParams = memoUntilDestroyed(
    (): FormGroupFacadeParams<Form> & {
      injector: Injector;
      destroyRef: DestroyRef;
    } => {
      return {
        ...this.params,
        injector: this.injector,
        destroyRef: this.destroyRef,
      };
    }
  );

  public readonly $fieldsVisibilityMap: Signal<
    Partial<Record<keyof Form['controls'], boolean>>
  >;

  constructor(private readonly params: Readonly<FormGroupFacadeParams<Form>>) {
    this.$form = this.params.form;
    this.$config = this.params.config;

    this.lifecycleHooksManager = new FormGroupLifecycleHooksManager(
      this.getParams()
    );
    this.statesManager = new FormGroupStatesManager(this.getParams());
    this.validationManager = new FormGroupValidationManager(this.getParams());
    this.valueChangesManager = new FormGroupValueChangesManager(
      this.getParams()
    );
    this.ids = new FormFieldIdGenerator(this.params.config);

    this.$fieldsVisibilityMap = this.statesManager.$fieldsVisibilityMap;

    merge(
      this.statesManager.statesChanges$,
      this.validationManager.validityChanges$,
      this.valueChangesManager.valueChanges$,
      this.lifecycleHooksManager.hookChanges$
    )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  showField(key: keyof Form['controls']): void {
    this.statesManager.showField(key);
  }

  hideField(key: keyof Form['controls']): void {
    this.statesManager.hideField(key);
  }

  enableField(key: keyof Form['controls']): void {
    this.statesManager.enableField(key);
  }

  disableField(key: keyof Form['controls']): void {
    this.statesManager.disableField(key);
  }

  addControlToFormArray(key: keyof Form['controls']): void {
    const config = this.config.controls[key] as Parameters<
      typeof isFormArrayConfig
    >[number];
    const control = this.form.controls[key as string];

    if (isFormArrayConfig(config) && isFormArray(control)) {
      control.push(buildControl(config.controls));
    }
  }

  removeControlFromFormArray(key: keyof Form['controls'], index: number): void {
    const formArray = this.form.controls[key as string];

    if (isFormArray(formArray)) {
      formArray.removeAt(index);
    }
  }
}

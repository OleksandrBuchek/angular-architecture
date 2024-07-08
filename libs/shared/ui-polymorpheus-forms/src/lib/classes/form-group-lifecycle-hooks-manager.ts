/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { DestroyRef, Injector, runInInjectionContext } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { objectEntries } from '@shared/util-object';

import { Observable, distinctUntilChanged, isObservable, map, merge, of, switchMap, tap } from 'rxjs';

import { isEqual } from '@shared/util-helpers';
import { FormGroupFacadeParamsBase, SubFormFieldConfig, FormGroupConfig } from '../models';
import { waitForConfigAndForm, getFormForConfig } from '../utils';

interface FormGroupLifecycleHooksManagerParams<Form extends FormGroup> extends FormGroupFacadeParamsBase<Form> {
  destroyRef: DestroyRef;
  injector: Injector;
}

export class FormGroupLifecycleHooksManager<Form extends FormGroup> {
  readonly hookChanges$: Observable<void>;

  constructor(private readonly params: FormGroupLifecycleHooksManagerParams<Form>) {
    this.hookChanges$ = merge(this.getOnInitChanges(), this.getOnDestroyChanges());
  }

  private getOnInitChanges(): Observable<void> {
    return waitForConfigAndForm(this.params).pipe(
      switchMap(({ form, config }) => {
        const changes$ = objectEntries(config.controls).map(([key, config]) =>
          this.getOnInitChangesFor(config, getFormForConfig(form, key) as Form),
        );

        if (this.params.isRoot) {
          changes$.push(this.getOnInitChangesFor(config, form));
        }

        return merge(...changes$);
      }),
    );
  }

  private getOnDestroyChanges(): Observable<void> {
    return waitForConfigAndForm(this.params).pipe(
      tap(({ form, config }) => {
        this.params.destroyRef.onDestroy(() => {
          runInInjectionContext(this.params.injector, () => {
            objectEntries(config.controls).forEach(([key, config]) => {
              config?.hooks?.onDestroy && config?.hooks?.onDestroy(getFormForConfig(form, key) as any);
            });

            if (this.params.isRoot) {
              config?.hooks?.onDestroy && config?.hooks?.onDestroy(form);
            }
          });
        });
      }),
      map(() => undefined),
    );
  }

  private getOnInitChangesFor(config: SubFormFieldConfig<Form> | FormGroupConfig<Form>, form: Form): Observable<void> {
    const onInitResult = runInInjectionContext(
      this.params.injector,
      () => config?.hooks?.onInit && config?.hooks.onInit(form as any),
    );

    const changes$ = isObservable(onInitResult) ? onInitResult : of(null);

    return changes$.pipe(
      distinctUntilChanged(isEqual),
      map(() => undefined),
    );
  }
}

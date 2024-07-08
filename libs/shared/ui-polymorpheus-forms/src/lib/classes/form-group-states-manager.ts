/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injector, Signal, WritableSignal, computed, runInInjectionContext, signal } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import {
  asyncScheduler,
  combineLatest,
  distinctUntilChanged,
  map,
  merge,
  Observable,
  of,
  shareReplay,
  skip,
  switchMap,
  tap,
} from 'rxjs';

import { objectEntries } from '@shared/util-object';

import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { isFunction } from '@shared/util-helpers';
import { asObservable, asSignal } from '@shared/util-rxjs-interop';
import { FormGroupFacadeParamsBase, FormFieldConfigStateType, SubFormFieldConfig, FormGroupConfig } from '../models';
import { waitForConfigAndForm, getFormForConfig } from '../utils';

interface StateChangeHandlerParams {
  control: AbstractControl;
  isStateActive: boolean;
  key?: PropertyKey;
}

type StateChangeHandler = (params: StateChangeHandlerParams) => void;

interface FormGroupStatesManagerParams<Form extends FormGroup> extends FormGroupFacadeParamsBase<Form> {
  injector: Injector;
}

type StatesMap<Form extends FormGroup> = Record<
  keyof Form['controls'],
  { value: Signal<boolean>; valueEmitter: WritableSignal<boolean> }
>;

export class FormGroupStatesManager<Form extends FormGroup> {
  readonly statesChanges$: Observable<void>;

  private readonly $visibleStatesMap: Signal<Partial<StatesMap<Form>>>;
  private readonly $disabledStatesMap: Signal<Partial<StatesMap<Form>>>;

  private readonly defaultValuesMap: Record<FormFieldConfigStateType, boolean> = {
    visible: true,
    disabled: false,
  };

  public readonly $fieldsVisibilityMap: Signal<Partial<Record<keyof Form['controls'], boolean>>>;

  constructor(private readonly params: Readonly<FormGroupStatesManagerParams<Form>>) {
    this.$visibleStatesMap = this.getStatesMap(FormFieldConfigStateType.visible);
    this.$disabledStatesMap = this.getStatesMap(FormFieldConfigStateType.disabled);
    this.$fieldsVisibilityMap = this.getVisibilityMap();

    this.statesChanges$ = this.getStateChanges();
  }

  showField(key: keyof Form['controls']): void {
    this.$visibleStatesMap()[key]?.valueEmitter.set(true);
  }

  hideField(key: keyof Form['controls']): void {
    this.$visibleStatesMap()[key]?.valueEmitter.set(false);
  }

  enableField(key: keyof Form['controls']): void {
    this.$visibleStatesMap()[key]?.valueEmitter.set(false);
  }

  disableField(key: keyof Form['controls']): void {
    this.$visibleStatesMap()[key]?.valueEmitter.set(true);
  }

  private getVisibilityMap() {
    return computed(() => {
      return objectEntries(this.$visibleStatesMap() ?? ({} as Partial<StatesMap<Form>>)).reduce(
        (acc, [key, value]) => {
          acc[key] = value?.value();
          return acc;
        },
        {} as Partial<Record<keyof Form['controls'], boolean>>,
      );
    });
  }

  private getStateChanges(): Observable<void> {
    const changes$ = [
      this.toggleControlOnStateChanges(this.$visibleStatesMap, this.visibleStateHandler, 'visible'),
      this.toggleControlOnStateChanges(this.$disabledStatesMap, this.disableStateHandler, 'disabled'),
    ];

    if (this.params.isRoot) {
      changes$.push(this.toggleDisabledStateChangesForRoot());
    }

    return merge(...changes$);
  }

  private toggleControlOnStateChanges(
    $statesMap: Signal<Partial<StatesMap<Form>>>,
    stateChangeHandler: StateChangeHandler,
    stateType: FormFieldConfigStateType,
  ): Observable<void> {
    return combineLatest([asObservable($statesMap), waitForConfigAndForm(this.params)]).pipe(
      switchMap(([statesMap, { form }]) => {
        const changes$ = objectEntries(statesMap).map(([key, value]) =>
          runInInjectionContext(this.params.injector, () =>
            asObservable(value?.value ?? this.defaultValuesMap[stateType]),
          ).pipe(
            tap((isStateActive) => {
              stateChangeHandler({
                control: form.controls[key as string],
                isStateActive,
                key,
              });
            }),
          ),
        );

        return merge(...changes$).pipe(map(() => undefined));
      }),
    );
  }

  private disableStateHandler = ({ control, isStateActive: isDisabled }: StateChangeHandlerParams): void => {
    if (isDisabled && control.enabled) {
      asyncScheduler.schedule(() => {
        control.disable();
      });
    } else if (!isDisabled && control.disabled) {
      control.enable();
    }
  };

  private visibleStateHandler = ({ control, isStateActive: isVisible, key }: StateChangeHandlerParams): void => {
    const canBeEnabled = key ? this.$disabledStatesMap()[key as keyof Form['controls']]?.value() === false : true;

    if (isVisible && control.disabled && canBeEnabled) {
      control.enable();
    } else if (!isVisible) {
      asyncScheduler.schedule(() => {
        control.disable();
        control.reset();
      });
    }
  };

  private getStatesMap(stateType: FormFieldConfigStateType): Signal<Partial<StatesMap<Form>>> {
    return asSignal(
      waitForConfigAndForm(this.params).pipe(
        map(({ config, form }) => {
          return objectEntries(config.controls).reduce((acc, [key, config]) => {
            const valueEmitter = signal<boolean>(this.defaultValuesMap[stateType]);

            const changes$ = this.getStateChangesFor(config, getFormForConfig(form, key) as any, stateType);

            const emittedValue$ = runInInjectionContext(this.params.injector, () =>
              toObservable(valueEmitter).pipe(skip(1)),
            );

            const value = runInInjectionContext(this.params.injector, () =>
              toSignal(
                merge(changes$, emittedValue$).pipe(
                  distinctUntilChanged(),
                  shareReplay({ refCount: true, bufferSize: 1 }),
                ),
                { requireSync: true },
              ),
            );

            acc[key] = { value, valueEmitter };

            return acc;
          }, {} as StatesMap<Form>);
        }),
      ),
      { initialValue: {} as Partial<StatesMap<Form>> },
    );
  }

  private getStateChangesFor(
    config: SubFormFieldConfig<Form> | FormGroupConfig<Form>,
    form: Form,
    stateType: FormFieldConfigStateType,
  ): Observable<boolean> {
    const stateChangeFnOrBoolean = (config.states && config.states[stateType]) ?? this.defaultValuesMap[stateType];

    return runInInjectionContext(this.params.injector, () =>
      isFunction(stateChangeFnOrBoolean) ? stateChangeFnOrBoolean(form as any) : of(stateChangeFnOrBoolean),
    ).pipe(distinctUntilChanged());
  }

  private toggleDisabledStateChangesForRoot(): Observable<void> {
    return waitForConfigAndForm(this.params).pipe(
      switchMap(({ config, form }) => {
        return this.getStateChangesFor(config, form, FormFieldConfigStateType.disabled).pipe(
          tap((isDisabled) => {
            this.disableStateHandler({ control: form, isStateActive: isDisabled });
          }),
          map(() => undefined),
        );
      }),
    );
  }
}

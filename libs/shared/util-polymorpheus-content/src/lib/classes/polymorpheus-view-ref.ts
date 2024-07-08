/* eslint-disable @angular-eslint/directive-selector */
import {
  Type,
  inject,
  Injector,
  ViewContainerRef,
  ComponentRef,
  runInInjectionContext,
  OutputEmitterRef,
  DestroyRef,
  Renderer2,
} from '@angular/core';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { objectEntries } from '@shared/util-object';
import { asInputObservable } from '@shared/util-rxjs-interop';
import { pipe, switchMap, tap, merge } from 'rxjs';
import {
  PolymorpheusComponentOutputsHandlers,
  PolymorpheusComponentInputs,
  PolymorpheusComponentViewContainerRefParams,
} from '../models';
import { PolymorpheusComponent } from './polymorpheus-component';
import { ExtractEventEmitters } from '@shared/util-types';
import { getInputsFromParams, getOutputHandlersFromParams } from '../utils';

export class PolymorpheusComponentViewContainerRef<TComponent extends Type<any>> {
  private readonly injector: Injector;
  private readonly vcr: ViewContainerRef;
  private readonly destroyRef: DestroyRef;
  private readonly renderer = inject(Renderer2);

  private componentRef: ComponentRef<TComponent> | null = null;

  private readonly inputs: PolymorpheusComponentInputs<TComponent>;
  private readonly outputsHandlers: Partial<PolymorpheusComponentOutputsHandlers<TComponent>>;

  constructor(
    private readonly polymorpheusComponent: PolymorpheusComponent<TComponent>,
    params?: PolymorpheusComponentViewContainerRefParams<TComponent>,
  ) {
    this.injector = params?.injector ?? inject(Injector);
    this.vcr = params?.viewContainer ?? inject(ViewContainerRef);
    this.destroyRef = params?.destroyRef ?? inject(DestroyRef);

    this.inputs = getInputsFromParams(params);
    this.outputsHandlers = getOutputHandlersFromParams(params);

    this.destroyRef.onDestroy(() => {
      this.destroy();
    });
  }

  public createComponent(): ComponentRef<TComponent> {
    runInInjectionContext(this.injector, () => {
      this.renderComponent();
      this.handleInputsChanges();
      this.handleOutputsChanges();
      this.setCssClasses();
    });

    return this.componentRef as ComponentRef<TComponent>;
  }

  public destroy(): void {
    this.componentRef?.destroy();
    this.vcr.clear();
    this.componentRef = null;
  }

  private renderComponent(): void {
    this.destroy();

    this.componentRef = this.vcr.createComponent(this.polymorpheusComponent.component, {
      injector: this.polymorpheusComponent.createInjector(this.injector),
    });
  }

  private readonly handleInputsChanges = rxMethod<void>(
    pipe(
      switchMap(() => {
        const mergedInputs = {
          ...this.polymorpheusComponent.inputs,
          ...this.inputs,
        };

        const changes$ = objectEntries(mergedInputs).map(([key, valueOrReactive]) =>
          asInputObservable(valueOrReactive).pipe(
            tap((value) => {
              this.componentRef?.setInput(key, value);
            }),
          ),
        );

        return merge(...changes$);
      }),
    ),
  );

  private readonly handleOutputsChanges = rxMethod<void>(
    pipe(
      switchMap(() => {
        const outputs = (this.componentRef?.instance ?? {}) as ExtractEventEmitters<InstanceType<TComponent>>;

        const changes$ = objectEntries(outputs)
          .filter(([_, eventEmitter]) => eventEmitter instanceof OutputEmitterRef)
          .map(([key, eventEmitter]) => {
            return outputToObservable(eventEmitter).pipe(
              tap((emittedValue) => {
                this.propagateOutputValue(key as keyof ExtractEventEmitters<InstanceType<TComponent>>, emittedValue);
              }),
            );
          });

        return merge(...changes$);
      }),
    ),
  );

  private propagateOutputValue(key: keyof ExtractEventEmitters<InstanceType<TComponent>>, emittedValue: unknown): void {
    const outputHandlers = [this.polymorpheusComponent.outputsHandlers[key], this.outputsHandlers[key]].filter(
      (handler): handler is PolymorpheusComponentOutputsHandlers<TComponent>[typeof key] => Boolean(handler),
    );

    runInInjectionContext(this.injector, () =>
      outputHandlers.forEach((handler) => {
        handler(emittedValue);
      }),
    );
  }

  private setCssClasses(): void {
    this.polymorpheusComponent.className
      .split(' ')
      .filter((className) => className.length)
      .forEach((className) => {
        this.renderer.addClass(this.componentRef?.location.nativeElement, className);
      });
  }
}

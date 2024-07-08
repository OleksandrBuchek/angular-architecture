import { Injector, Type } from '@angular/core';
import { objectEntries } from '@shared/util-object';
import { asInputSignal } from '@shared/util-rxjs-interop';
import {
  PolymorpheusComponentContext,
  PolymorpheusComponentOutputsHandlers,
  PolymorpheusComponentInputs,
  PolymorpheusComponentParams,
  ValueOrNever,
} from '../models';
import { toCssClass } from '@shared/util-helpers';
import { getInputsFromParams, getOutputHandlersFromParams } from '../utils';
import { POLYMORPHEUS_CONTEXT } from '../tokens';

export class PolymorpheusComponent<TComponent extends Type<any> = Type<any>> {
  public readonly inputs: ValueOrNever<PolymorpheusComponentInputs<TComponent>>;
  public readonly outputsHandlers: ValueOrNever<Partial<PolymorpheusComponentOutputsHandlers<TComponent>>>;
  public readonly className: string;

  constructor(
    public readonly component: TComponent,
    private readonly params: PolymorpheusComponentParams<TComponent>,
  ) {
    this.inputs = getInputsFromParams(this.params);
    this.outputsHandlers = getOutputHandlersFromParams(this.params);
    this.className = toCssClass(params.className);
  }

  public createInjector(parent?: Injector): Injector {
    return Injector.create({
      parent,
      providers: [
        {
          provide: POLYMORPHEUS_CONTEXT,
          useValue: this.getContext(),
        },
        this.params.providers ?? [],
      ],
    });
  }

  private getContext(): PolymorpheusComponentContext<TComponent> {
    return objectEntries(this.inputs).reduce(
      (acc, [key, value]) => ({ ...acc, [key]: asInputSignal(value) }),
      {} as PolymorpheusComponentContext<TComponent>,
    );
  }
}

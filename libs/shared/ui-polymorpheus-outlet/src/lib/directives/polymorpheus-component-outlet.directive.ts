/* eslint-disable @angular-eslint/directive-selector */
import { Directive, Type, OnChanges, input, Injector, inject, runInInjectionContext } from '@angular/core';
import {
  PolymorpheusComponent,
  PolymorpheusComponentInputs,
  PolymorpheusComponentOutputsHandlers,
  PolymorpheusComponentViewContainerRefParams,
  PolymorpheusComponentParams,
  PolymorpheusComponentOrFactory,
  PolymorpheusComponentViewContainerRef,
} from '@shared/util-polymorpheus-content';

@Directive({
  standalone: true,
  selector: '[polymorpheusComponentOutlet]',
})
export class PolymorpheusComponentOutletDirective<TComponent extends Type<any>> implements OnChanges {
  public readonly getPolymorpheusComponent = input.required<PolymorpheusComponentOrFactory<TComponent>>({
    alias: 'polymorpheusComponentOutlet',
  });

  public readonly outputsHandlers = input<Partial<PolymorpheusComponentOutputsHandlers<TComponent>>>(
    {},
    {
      alias: 'polymorpheusComponentOutletOutputsHanlders',
    },
  );

  public readonly inputs = input<Partial<PolymorpheusComponentInputs<TComponent>>>(
    {},
    {
      alias: 'polymorpheusComponentOutletInputs',
    },
  );

  private readonly injector = inject(Injector);

  public ngOnChanges(): void {
    const componentOrFactory = this.getPolymorpheusComponent();

    const polymorpheusComponent =
      componentOrFactory instanceof PolymorpheusComponent
        ? componentOrFactory
        : componentOrFactory({} as PolymorpheusComponentParams<TComponent>);

    runInInjectionContext(this.injector, () => {
      const vcr = new PolymorpheusComponentViewContainerRef(polymorpheusComponent, {
        inputs: this.inputs(),
        outputsHandlers: this.outputsHandlers(),
      } as unknown as PolymorpheusComponentViewContainerRefParams<TComponent>);

      vcr.createComponent();
    });
  }
}

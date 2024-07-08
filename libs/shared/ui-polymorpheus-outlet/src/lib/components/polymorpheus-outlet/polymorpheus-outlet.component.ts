import { Component, computed, input } from '@angular/core';
import {
  createPolymorpheusComponent,
  partial,
  isComponent,
  isTemplateWithContext,
  isPrimitive,
  PolymorpheusContent,
  WithPolymorpheusContent,
} from '@shared/util-polymorpheus-content';
import { PolymorpheusComponentOutletDirective } from '../../directives';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  standalone: true,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'polymorpheus-outlet',
  imports: [PolymorpheusComponentOutletDirective, NgTemplateOutlet],
  templateUrl: './polymorpheus-outlet.component.html',
  styleUrl: './polymorpheus-outlet.component.scss',
})
export class PolymorpheusOutletComponent<T = any> implements WithPolymorpheusContent<T> {
  public readonly content = input.required<PolymorpheusContent<T>>();

  public readonly isComponent = computed(() => isComponent(this.content()));

  public readonly asComponent = computed(() => {
    const maybeComponent = this.content();
    return isComponent(maybeComponent) ? maybeComponent : undefined;
  });

  public readonly isTemplate = computed(() => isTemplateWithContext(this.content()));
  public readonly asTemplate = computed(() => {
    const maybeTemplate = this.content();

    return isTemplateWithContext(maybeTemplate) ? maybeTemplate : undefined;
  });

  public readonly asPrimitive = computed(() => {
    const maybePrimitive = this.content();

    return isPrimitive(maybePrimitive) ? maybePrimitive : undefined;
  });
}

export const polymorpheusOutlet = createPolymorpheusComponent(PolymorpheusOutletComponent);
export const polymorpheusOutletPartial = partial(polymorpheusOutlet);

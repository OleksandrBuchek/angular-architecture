/* eslint-disable @angular-eslint/directive-selector */
import { Attribute, Directive, ElementRef, Renderer2, computed, effect, inject, input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
  standalone: true,
  selector: '[formFieldName]',
})
export class FormFieldNameDirective<Form extends FormGroup, Key extends keyof Form['controls']> {
  public readonly nameAsInput = input<Key>('' as Key, { alias: 'formFieldName' });
  public readonly formArrayItemIndex = input<number>();
  private readonly elementRef = inject(ElementRef);
  private readonly render = inject(Renderer2);

  public readonly name = computed(() => this.nameAsParameter ?? this.nameAsInput());

  constructor(@Attribute('formFieldName') private readonly nameAsParameter?: Key) {
    this.addClass();
  }

  private addClass(): void {
    this.render.addClass(this.elementRef.nativeElement, `pg-form__field`);
    effect(() => {
      if (this.name()) {
        this.render.addClass(this.elementRef.nativeElement, `pg-form__field--${this.name() as string}`);
      }
    });
  }
}

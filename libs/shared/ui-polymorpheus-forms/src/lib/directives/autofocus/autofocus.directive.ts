/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef, Input, inject } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[autofocus]',
})
export class AutofocusDirective {
  @Input({ required: true }) public autofocus: boolean = false;

  private readonly host = inject(ElementRef);

  ngAfterViewInit() {
    if (this.autofocus) {
      this.host.nativeElement.focus();
    }
  }
}

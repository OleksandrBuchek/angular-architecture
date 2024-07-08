/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @angular-eslint/directive-selector */
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AsyncPipe, NgComponentOutlet } from '@angular/common';
import { injectFieldComponent } from '../../injectors';

@Component({
  standalone: true,
  selector: 'form-field-wrapper',
  templateUrl: './form-field-wrapper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgComponentOutlet, AsyncPipe],
})
export class FormFieldWrapperComponent {
  readonly fieldComponent$ = injectFieldComponent();
}

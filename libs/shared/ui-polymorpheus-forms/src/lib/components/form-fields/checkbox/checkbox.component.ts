/* eslint-disable @angular-eslint/component-selector */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { injectPlaceholder, injectLabel, injectFieldControl, injectColor, injectExtra } from '../../../injectors';
import { AsyncPipe } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'checkbox-field',
  standalone: true,
  imports: [MatCheckboxModule, ReactiveFormsModule, AsyncPipe],
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent<Form extends FormGroup, Key extends keyof Form['controls']> {
  readonly placeholder = injectPlaceholder<Form, Key>();
  readonly label = injectLabel<Form, Key>();
  readonly control = injectFieldControl<Form, Key>();
  readonly color = injectColor<Form, Key>();
  readonly extra = injectExtra();
}

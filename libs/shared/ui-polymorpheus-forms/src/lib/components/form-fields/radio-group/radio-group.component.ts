/* eslint-disable @angular-eslint/component-selector */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AsyncPipe } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  injectColor,
  injectErrorMessages,
  injectFieldControl,
  injectFieldOptions,
  injectLabel,
} from '../../../injectors';

@Component({
  selector: 'radio-group-field',
  standalone: true,
  imports: [MatRadioModule, AsyncPipe, ReactiveFormsModule, MatFormFieldModule],
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioGroupComponent<Form extends FormGroup, Key extends keyof Form['controls']> {
  readonly control = injectFieldControl<Form, Key>();
  readonly options = injectFieldOptions();
  readonly errorMessages$ = injectErrorMessages<Form, Key>();
  readonly color = injectColor<Form, Key>();
  readonly label = injectLabel<Form, Key>();
}

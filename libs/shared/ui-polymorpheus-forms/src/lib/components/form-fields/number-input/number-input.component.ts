/* eslint-disable @angular-eslint/component-selector */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {
  injectPlaceholder,
  injectLabel,
  injectFieldControl,
  injectErrorMessages,
  injectTemplateValidationParams,
  injectStepAttribute,
  injectHint,
  injectSuffixAndPrefix,
} from '../../../injectors';
import { AsyncPipe } from '@angular/common';
import { NumberFieldFormControlConfigValidationParams } from '../../../models';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'number-input-field',
  standalone: true,
  imports: [MatInputModule, ReactiveFormsModule, AsyncPipe, MatFormFieldModule, MatFormFieldModule],
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberInputComponent<Form extends FormGroup, Key extends keyof Form['controls']> {
  readonly placeholder = injectPlaceholder<Form, Key>();
  readonly label = injectLabel<Form, Key>();
  readonly control = injectFieldControl<Form, Key>();
  readonly errorMessages$ = injectErrorMessages<Form, Key>();
  readonly validationParams = injectTemplateValidationParams<Form, Key, NumberFieldFormControlConfigValidationParams>();
  readonly step = injectStepAttribute<Form, Key>();
  readonly hint = injectHint<Form, Key>();
  readonly suffixAndPrefix = injectSuffixAndPrefix<Form, Key>();
}

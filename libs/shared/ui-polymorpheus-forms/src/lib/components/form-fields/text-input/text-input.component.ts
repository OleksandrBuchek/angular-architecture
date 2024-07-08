/* eslint-disable @angular-eslint/component-selector */
import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {
  injectPlaceholder,
  injectLabel,
  injectFieldControl,
  injectErrorMessages,
  injectTemplateValidationParams,
  injectInputTypeAttribute,
  injectAutofocus,
  injectExtra,
  injectHint,
  injectSuffixAndPrefix,
  injectAutocomplete,
  injectName,
  injectSuffixAndPrefixIcons,
  injectSubmitAction,
} from '../../../injectors';
import { AsyncPipe } from '@angular/common';
import { TextFieldFormControlConfigValidationParams } from '../../../models';
import { AutofocusDirective } from '../../../directives';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { controlValueSignal } from '@shared/util-forms';

@Component({
  selector: 'text-input-field',
  standalone: true,
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    AsyncPipe,
    AutofocusDirective,
    MatFormFieldModule,
    MatIconModule,
  ],
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInputComponent<
  Form extends FormGroup,
  Key extends keyof Form['controls']
> {
  private readonly submitAction = injectSubmitAction();

  private readonly $controlValue: Signal<Form['value'][Key]>;

  readonly placeholder = injectPlaceholder<Form, Key>();
  readonly autocomplete = injectAutocomplete<Form, Key>();
  readonly label = injectLabel<Form, Key>();
  readonly control = injectFieldControl<Form, Key>();
  readonly errorMessages$ = injectErrorMessages<Form, Key>();
  readonly validationParams = injectTemplateValidationParams<
    Form,
    Key,
    TextFieldFormControlConfigValidationParams
  >();
  readonly inputType = injectInputTypeAttribute();
  readonly autofocus = injectAutofocus();
  readonly extra = injectExtra();
  readonly hint = injectHint<Form, Key>();
  readonly suffixAndPrefix = injectSuffixAndPrefix<Form, Key>();
  readonly name = injectName();
  readonly suffixAndPrefixIcons = injectSuffixAndPrefixIcons();

  constructor() {
    this.$controlValue = controlValueSignal(this.control);
  }

  onSubmit(): void {
    this.submitAction(this.$controlValue());
  }
}

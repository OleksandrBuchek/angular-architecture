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
  injectInputTypeAttribute,
  injectAutofocus,
  injectDatepickerIcon,
  injectExtra,
} from '../../../injectors';
import { DatepickerFormControlConfigValidationParams } from '../../../models';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'datepicker-field',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, ReactiveFormsModule, AsyncPipe, MatIconModule],
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerComponent<Form extends FormGroup, Key extends keyof Form['controls']> {
  readonly placeholder = injectPlaceholder<Form, Key>();
  readonly label = injectLabel<Form, Key>();
  readonly control = injectFieldControl<Form, Key>();
  readonly errorMessages$ = injectErrorMessages<Form, Key>();
  readonly validationParams = injectTemplateValidationParams<Form, Key, DatepickerFormControlConfigValidationParams>();
  readonly inputType = injectInputTypeAttribute();
  readonly autofocus = injectAutofocus();
  readonly icon = injectDatepickerIcon();
  readonly extra = injectExtra();
}

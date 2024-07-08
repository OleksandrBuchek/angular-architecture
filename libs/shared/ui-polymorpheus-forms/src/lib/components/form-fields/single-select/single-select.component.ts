/* eslint-disable @angular-eslint/component-selector */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { AsyncPipe } from '@angular/common';
import {
  injectPlaceholder,
  injectLabel,
  injectFieldControl,
  injectFieldOptions,
  injectErrorMessages,
  injectHideSingleSelectionIndicator,
  injectIsMultipleSelection,
  injectExtra,
  injectSuffixAndPrefixIcons,
} from '../../../injectors';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'single-select-field',
  standalone: true,
  imports: [MatSelectModule, ReactiveFormsModule, AsyncPipe, MatIconModule, MatFormFieldModule],
  templateUrl: './single-select.component.html',
  styleUrls: ['./single-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleSelectComponent<Form extends FormGroup, Key extends keyof Form['controls']> {
  readonly placeholder = injectPlaceholder<Form, Key>();
  readonly label = injectLabel<Form, Key>();
  readonly control = injectFieldControl<Form, Key>();
  readonly options = injectFieldOptions();
  readonly errorMessages$ = injectErrorMessages<Form, Key>();
  readonly hideSingleSelectionIndicator = injectHideSingleSelectionIndicator();
  readonly multiple = injectIsMultipleSelection();
  readonly extra = injectExtra();
  readonly suffixAndPrefixIcons = injectSuffixAndPrefixIcons();
}

/* eslint-disable @angular-eslint/component-selector */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  injectDisplayWithFn,
  injectErrorMessages,
  injectFieldControl,
  injectFieldOptions,
  injectLabel,
  injectPlaceholder,
} from '../../../injectors';
import { AsyncPipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'autocomplete-field',
  standalone: true,
  imports: [MatAutocompleteModule, MatFormFieldModule, ReactiveFormsModule, AsyncPipe, MatInputModule],
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteComponent<Form extends FormGroup, Key extends keyof Form['controls']> {
  readonly control = injectFieldControl<Form, Key>();
  readonly placeholder = injectPlaceholder<Form, Key>();
  readonly label = injectLabel<Form, Key>();
  readonly options = injectFieldOptions();
  readonly displayWithFn = injectDisplayWithFn();
  readonly errorMessages$ = injectErrorMessages<Form, Key>();
}

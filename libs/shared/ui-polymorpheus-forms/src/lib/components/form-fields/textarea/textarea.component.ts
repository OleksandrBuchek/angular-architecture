/* eslint-disable @angular-eslint/component-selector */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {
  injectErrorMessages,
  injectFieldControl,
  injectLabel,
  injectPlaceholder,
  injectAutosizeProps,
} from '../../../injectors';
import { AsyncPipe } from '@angular/common';
import { TextFieldModule } from '@angular/cdk/text-field';

@Component({
  selector: 'textarea-field',
  standalone: true,
  imports: [MatInputModule, ReactiveFormsModule, AsyncPipe, TextFieldModule],
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaComponent<Form extends FormGroup, Key extends keyof Form['controls']> {
  readonly placeholder = injectPlaceholder<Form, Key>();
  readonly label = injectLabel<Form, Key>();
  readonly control = injectFieldControl<Form, Key>();
  readonly errorMessages$ = injectErrorMessages<Form, Key>();
  readonly autosizeProps = injectAutosizeProps<Form, Key>();
}

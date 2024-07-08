import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { injectFieldControl, injectColor, injectLabel, injectLabelPosition } from '../../../injectors';

@Component({
  selector: 'slider-toggle-field',
  standalone: true,
  imports: [MatSlideToggleModule, ReactiveFormsModule],
  templateUrl: './slider-toggle.component.html',
  styleUrl: './slider-toggle.component.scss',
})
export class SliderToggleComponent<Form extends FormGroup, Key extends keyof Form['controls']> {
  readonly control = injectFieldControl<Form, Key>();
  readonly label = injectLabel();
  readonly color = injectColor<Form, Key>();
  readonly labelPosition = injectLabelPosition<Form, Key>();
}

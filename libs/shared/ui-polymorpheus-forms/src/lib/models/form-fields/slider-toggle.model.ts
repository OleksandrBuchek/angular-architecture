import { FormGroup, FormArray } from '@angular/forms';
import { FormControlConfigBase } from '../../..';
import { WithColorProps, WithLabelPosition } from './props';

export interface SliderToggleProps extends Partial<WithColorProps>, Partial<WithLabelPosition> {}

export interface SliderToggleFormControlConfig<
  Form extends FormGroup | FormArray,
  Key extends keyof Form['controls'] | number,
> extends FormControlConfigBase<Form, Key> {
  type: 'SliderToggle';
  props?: SliderToggleProps;
  validation?: never;
}

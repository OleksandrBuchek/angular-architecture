import { FormGroup, FormArray } from '@angular/forms';
import { FormControlConfigBase } from './base.model';
import { FieldPropsBase } from './props';
import { TextFieldFormControlConfigValidation } from './text-input.model';

export interface TextAreaProps extends FieldPropsBase {
  autosize?: boolean;
  minRows?: number;
  maxRows?: number;
}

export interface TextAreaFormControlConfig<
  Form extends FormGroup | FormArray,
  Key extends keyof Form['controls'] | number,
> extends FormControlConfigBase<Form, Key> {
  type: 'TextArea';
  props: TextAreaProps;
  validation?: Partial<TextFieldFormControlConfigValidation<Form, Key>>;
}

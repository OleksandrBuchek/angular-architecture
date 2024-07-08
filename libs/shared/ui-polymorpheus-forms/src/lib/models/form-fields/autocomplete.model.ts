import { FormGroup, FormArray } from '@angular/forms';
import { WithOptions, FieldPropsBase } from './props';
import { FormControlConfigBase } from './base.model';
import { TextFieldFormControlConfigValidation } from './text-input.model';

export interface AutocompleteProps<Form extends FormGroup | FormArray>
  extends Partial<WithOptions<Form>>,
    FieldPropsBase {
  displayWith?: (value: any) => string;
}

export interface AutocompleteFormControlConfig<
  Form extends FormGroup | FormArray,
  Key extends keyof Form['controls'] | number,
> extends FormControlConfigBase<Form, Key> {
  type: 'Autocomplete';
  props: AutocompleteProps<Form>;
  validation?: Partial<TextFieldFormControlConfigValidation<Form, Key>>;
}

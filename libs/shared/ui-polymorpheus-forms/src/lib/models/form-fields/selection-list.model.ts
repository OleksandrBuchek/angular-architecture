import { FormGroup, FormArray } from '@angular/forms';
import { FormControlConfigBase } from './base.model';
import { WithOptions, WithSelectedBy } from './props';

export interface SelectionListProps<Form extends FormGroup | FormArray, Key extends keyof Form['controls'] | number>
  extends Partial<WithOptions<Form>>,
    Partial<WithSelectedBy<Form, Key>> {}

export interface SelectionListFormControlConfig<
  Form extends FormGroup | FormArray,
  Key extends keyof Form['controls'] | number,
> extends Omit<FormControlConfigBase<Form, Key>, 'defaultValue'> {
  type: 'SelectionList';
  props?: SelectionListProps<Form, Key>;
  validation?: never;
  defaultValue: Required<Form['value']>[Key] & any[];
}

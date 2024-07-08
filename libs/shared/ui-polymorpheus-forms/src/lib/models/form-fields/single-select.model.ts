import { FormGroup, FormArray } from '@angular/forms';
import { FormFieldValidationBase } from '../../..';
import { FormControlConfigBase } from './base.model';
import { FieldPropsBase, WithOptions, WithSuffixAndPrefixIcons, WithCompareWith } from './props';

export interface SingleSelectProps<Form extends FormGroup | FormArray, Key extends keyof Form['controls'] | number>
  extends FieldPropsBase,
    WithOptions<Form>,
    Partial<WithSuffixAndPrefixIcons>,
    Partial<WithCompareWith<Form, Key>> {
  hideSingleSelectionIndicator?: boolean;
  multiple?: boolean;
}

export interface SingleSelectFormControlConfig<
  Form extends FormGroup | FormArray,
  Key extends keyof Form['controls'] | number,
> extends FormControlConfigBase<Form, Key> {
  type: 'SingleSelect';
  props: SingleSelectProps<Form, Key>;
  validation?: Partial<FormFieldValidationBase<Form>>;
}

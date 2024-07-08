import { FormGroup, FormArray } from '@angular/forms';
import { FormControlConfigBase } from './base.model';
import { FieldPropsBase, WithSuffixAndPrefix, WithTextAlign, WithDecimalLimitProps } from './props';
import { NumberFieldFormControlConfigValidation } from './number-input.model';

export interface InputAmountProps
  extends FieldPropsBase,
    Partial<WithSuffixAndPrefix>,
    Partial<WithTextAlign>,
    Partial<WithDecimalLimitProps> {}

export interface InputAmountFormControlConfig<
  Form extends FormGroup | FormArray,
  Key extends keyof Form['controls'] | number,
> extends FormControlConfigBase<Form, Key> {
  type: 'InputAmount';
  props: InputAmountProps;
  validation?: Partial<NumberFieldFormControlConfigValidation<Form, Key>>;
}

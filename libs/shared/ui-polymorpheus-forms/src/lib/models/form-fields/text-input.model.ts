import { FormGroup, FormArray } from '@angular/forms';
import { FieldPropsBase, WithSuffixAndPrefix, WithSuffixAndPrefixIcons, WithName, WithSubmitAction } from './props';
import { FormControlConfigValidationWithParams } from '../form-field-validation.model';
import { TextFieldFormControlConfigValidationParams } from '../validation-params.model';
import { FormControlConfigBase } from './base.model';

export type TextInputTypeAttribute = (typeof TextInputTypeAttribute)[keyof typeof TextInputTypeAttribute];

export const TextInputTypeAttribute = {
  password: 'password',
  text: 'text',
} as const;

export interface TextInputProps<Form extends FormGroup | FormArray, Key extends keyof Form['controls'] | number>
  extends FieldPropsBase,
    Partial<WithSuffixAndPrefix>,
    Partial<WithSuffixAndPrefixIcons>,
    Partial<WithName>,
    Partial<WithSubmitAction<Form, Key>> {
  type?: TextInputTypeAttribute;
}

export type TextFieldFormControlConfigValidation<
  Form extends FormGroup | FormArray,
  Key extends keyof Form['controls'] | number,
> = FormControlConfigValidationWithParams<Form, Key, TextFieldFormControlConfigValidationParams>;

export interface InputTextFormControlConfig<
  Form extends FormGroup | FormArray,
  Key extends keyof Form['controls'] | number,
> extends FormControlConfigBase<Form, Key> {
  type: 'InputText';
  props: TextInputProps<Form, Key>;
  validation?: Partial<TextFieldFormControlConfigValidation<Form, Key>>;
}

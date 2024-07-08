export type DatepickerFormControlConfigValidationParams = {
  minDate: Date | string;
  maxDate: Date | string;
};

export type TextFieldFormControlConfigValidationParams = {
  minLength: number;
  maxLength: number;
};

export type NumberFieldFormControlConfigValidationParams = {
  min: number;
  max: number;
};

export type FormValidationParams = NumberFieldFormControlConfigValidationParams &
  TextFieldFormControlConfigValidationParams &
  DatepickerFormControlConfigValidationParams;

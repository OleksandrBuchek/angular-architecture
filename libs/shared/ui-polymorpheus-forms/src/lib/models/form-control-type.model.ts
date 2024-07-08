export type FormControlType =
  (typeof FormControlType)[keyof typeof FormControlType];

export const FormControlType = {
  InputText: 'InputText',
  InputNumber: 'InputNumber',
  InputRadioGroup: 'InputRadioGroup',
  InputAmount: 'InputAmount',
  SingleSelect: 'SingleSelect',
  TextArea: 'TextArea',
  Autocomplete: 'Autocomplete',
  Checkbox: 'Checkbox',
  Datepicker: 'Datepicker',
  SliderToggle: 'SliderToggle',
  SelectionList: 'SelectionList',
} as const;

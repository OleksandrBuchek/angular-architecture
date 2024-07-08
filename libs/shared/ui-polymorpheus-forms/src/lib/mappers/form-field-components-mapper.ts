import { Type } from '@angular/core';
import { FormControlType } from '../models';

export const FORM_FIELD_COMPONENTS_MAPPER: Record<
  FormControlType,
  () => Promise<Type<unknown>>
> = {
  [FormControlType.InputText]: async () =>
    (await import('../components/form-fields/text-input/text-input.component'))
      .TextInputComponent,
  [FormControlType.InputRadioGroup]: async () =>
    (
      await import(
        '../components/form-fields/radio-group/radio-group.component'
      )
    ).RadioGroupComponent,
  [FormControlType.SingleSelect]: async () =>
    (
      await import(
        '../components/form-fields/single-select/single-select.component'
      )
    ).SingleSelectComponent,
  [FormControlType.TextArea]: async () =>
    (await import('../components/form-fields/textarea/textarea.component'))
      .TextareaComponent,
  [FormControlType.Autocomplete]: async () =>
    (
      await import(
        '../components/form-fields/autocomplete/autocomplete.component'
      )
    ).AutocompleteComponent,
  [FormControlType.Checkbox]: async () =>
    (await import('../components/form-fields/checkbox/checkbox.component'))
      .CheckboxComponent,
  [FormControlType.InputNumber]: async () =>
    (
      await import(
        '../components/form-fields/number-input/number-input.component'
      )
    ).NumberInputComponent,
  [FormControlType.Datepicker]: async () =>
    (await import('../components/form-fields/datepicker/datepicker.component'))
      .DatepickerComponent,
  [FormControlType.InputAmount]: async () =>
    (
      await import(
        '../components/form-fields/amount-input/amount-input.component'
      )
    ).AmountInputComponent,
  [FormControlType.SliderToggle]: async () =>
    (
      await import(
        '../components/form-fields/slider-toggle/slider-toggle.component'
      )
    ).SliderToggleComponent,
  [FormControlType.SelectionList]: async () =>
    (
      await import(
        '../components/form-fields/selection-list/selection-list.component'
      )
    ).SelectionListComponent,
} as const;

import { FormArray, FormGroup, isFormArray, isFormGroup } from '@angular/forms';

export const getFormForConfig = <Form extends FormGroup | FormArray, Key extends keyof Form['controls'] | number>(
  form: Form,
  key: Key,
): Form | Form['controls'][Key] => {
  const result =
    isFormGroup(form.get(key as string)) || isFormArray(form.get(key as string)) ? form.get(key as string) : form;

  return result as Form | Form['controls'][Key];
};

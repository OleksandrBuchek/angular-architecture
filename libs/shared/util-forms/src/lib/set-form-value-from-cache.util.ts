import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { tryCatch } from '@shared/util-try-catch';

export const patchFormValueIfExists = <Form extends FormGroup | FormControl | FormArray>(
  form: Form,
  cache: Form['value'] | null | undefined,
): void => {
  if (cache) {
    tryCatch(() => form.setValue(cache));
  }
};

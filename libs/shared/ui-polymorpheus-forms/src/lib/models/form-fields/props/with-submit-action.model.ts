import { FormGroup, FormArray } from '@angular/forms';

export interface WithSubmitAction<Form extends FormGroup | FormArray, Key extends keyof Form['controls'] | number> {
  onSubmit: (value: Required<Form['value']>[Key]) => void;
}

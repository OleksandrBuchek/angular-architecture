import { FormGroup, FormArray } from '@angular/forms';

export interface WithCompareWith<Form extends FormGroup | FormArray, Key extends keyof Form['controls'] | number> {
  compareWithFn?: (a: Required<Form['value']>[Key], b: Required<Form['value']>[Key]) => boolean;
}

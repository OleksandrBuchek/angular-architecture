import { FormArray, FormGroup } from '@angular/forms';

export interface WithSelectedBy<Form extends FormGroup | FormArray, Key extends keyof Form['controls'] | number> {
  selectedBy: (value: Required<Form['value']>[Key][number]) => any;
}

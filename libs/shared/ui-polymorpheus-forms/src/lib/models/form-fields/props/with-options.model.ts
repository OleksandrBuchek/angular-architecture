import { FormGroup, FormArray } from '@angular/forms';
import { UIOption, ValueOrReactive } from '@shared/util-types';

export interface WithOptions<Form extends FormGroup | FormArray> {
  options: ((form: Form) => ValueOrReactive<Array<UIOption<unknown>>>) | ValueOrReactive<Array<UIOption<unknown>>>;
}

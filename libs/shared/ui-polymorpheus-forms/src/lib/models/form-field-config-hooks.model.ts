import { FormArray, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

export interface FormFieldConfigHooksMap<Form extends FormGroup | FormArray> {
  onInit?: (form: Form) => void | Observable<unknown>;
  onDestroy?: (form: Form) => void;
}

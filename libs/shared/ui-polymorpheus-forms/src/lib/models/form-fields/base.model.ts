import { FormGroup, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { FormFieldConfigBase } from '../form-field-config-base.model';
import { IsNonNullableField } from '../is-non-nullable-field.model';

export interface FormControlConfigBase<Form extends FormGroup | FormArray, Key extends keyof Form['controls'] | number>
  extends Omit<FormFieldConfigBase<Form, Key>, 'validation'> {
  label?: string | Observable<string>;
  nonNullable: IsNonNullableField<Form, Key>;
  defaultValue: Required<Form['value']>[Key];
  tooltip?: Partial<{
    text: string;
    position: string;
  }>;
  extra?: Partial<{
    e2eAttr: string;
  }>;
}

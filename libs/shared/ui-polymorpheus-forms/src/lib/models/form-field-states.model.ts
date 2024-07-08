import { FormGroup, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

export type FormFieldConfigStateType = (typeof FormFieldConfigStateType)[keyof typeof FormFieldConfigStateType];

export const FormFieldConfigStateType = {
  visible: 'visible',
  disabled: 'disabled',
} as const;

export type FormFieldConfigStateChangesMap<Form extends FormGroup | FormArray> = Record<
  FormFieldConfigStateType,
  FormFieldConfigStateChangeFn<Form> | boolean
>;

export type FormFieldConfigStateChangeFn<Form extends FormGroup | FormArray> = (form: Form) => Observable<boolean>;

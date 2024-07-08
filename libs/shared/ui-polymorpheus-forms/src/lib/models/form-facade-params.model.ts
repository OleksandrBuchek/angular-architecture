import { Signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormGroupConfig } from './form-group-config.model';

export interface FormGroupFacadeParamsBase<Form extends FormGroup> {
  form: Signal<Form | undefined>;
  config: Signal<FormGroupConfig<Form> | undefined>;
  isRoot?: boolean;
}

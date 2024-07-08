import { FormGroup, FormArray } from '@angular/forms';
import { FormControlConfig } from './form-control-config.model';
import { FormGroupConfig } from './form-group-config.model';
import { FormArrayConfig } from './form-array-config.model';
import { ObjectValues } from '@shared/util-types';

export type GetFormFieldConfig<
  Form extends FormGroup | FormArray,
  Key extends keyof Form['controls'] | number,
> = Form['controls'][Key] extends FormGroup
  ? FormGroupConfig<Form['controls'][Key]>
  : Form['controls'][Key] extends FormArray
    ? FormArrayConfig<Form['controls'][Key]>
    : FormControlConfig<Form, Key>;

export type SubFormFieldConfig<Form extends FormGroup> = ObjectValues<{
  [Key in keyof Form['controls']]: GetFormFieldConfig<Form, Key>;
}>[number];

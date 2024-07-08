import { AutocompleteProps } from '../models';
import { injectControlConfig } from './control-config.injector';
import { FormGroup } from '@angular/forms';

export const injectDisplayWithFn = <Form extends FormGroup>(): ((value: any) => string) | null => {
  return (injectControlConfig().props as AutocompleteProps<Form>).displayWith ?? null;
};

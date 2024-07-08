import { FormGroup } from '@angular/forms';
import { WithCompareWith } from '../models';
import { injectControlConfig } from './control-config.injector';

export const injectComparedWithFn = <Form extends FormGroup, Key extends keyof Form['controls']>(): WithCompareWith<
  Form,
  Key
>['compareWithFn'] => {
  return (injectControlConfig<Form, Key>().props as WithCompareWith<Form, Key>).compareWithFn ?? ((a, b) => a === b);
};

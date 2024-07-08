import { FormGroup } from '@angular/forms';
import { WithSelectedBy } from '../models';
import { injectControlConfig } from './control-config.injector';

export const injectSelectedByFn = <Form extends FormGroup, Key extends keyof Form['controls']>(): WithSelectedBy<
  Form,
  Key
>['selectedBy'] => {
  return (injectControlConfig<Form, Key>().props as WithSelectedBy<Form, Key>).selectedBy ?? ((value) => value);
};

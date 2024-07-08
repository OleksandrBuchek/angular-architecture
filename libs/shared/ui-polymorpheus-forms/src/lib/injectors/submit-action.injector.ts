import { FormGroup } from '@angular/forms';
import { injectControlConfig } from './control-config.injector';
import { WithSubmitAction } from '../models';
import { EMPTY_FUNCTION } from '@shared/util-helpers';

export const injectSubmitAction = <Form extends FormGroup, Key extends keyof Form['controls']>(): WithSubmitAction<
  Form,
  Key
>['onSubmit'] => {
  return (injectControlConfig<Form, Key>().props as WithSubmitAction<Form, Key>).onSubmit ?? EMPTY_FUNCTION;
};

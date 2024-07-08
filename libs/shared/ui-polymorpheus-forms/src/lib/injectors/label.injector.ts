import { FormGroup } from '@angular/forms';
import { injectControlConfig } from './control-config.injector';
import { Signal } from '@angular/core';
import { asSignal } from '@shared/util-rxjs-interop';

export const injectLabel = <Form extends FormGroup, Key extends keyof Form['controls']>(): Signal<
  string | undefined
> => {
  const label = injectControlConfig<Form, Key>().label;

  return asSignal(label);
};

import { FormGroup } from '@angular/forms';
import { injectControlConfig } from './control-config.injector';
import { FieldPropsBase } from '../models';
import { Signal } from '@angular/core';
import { asSignal } from '@shared/util-rxjs-interop';

export const injectHint = <Form extends FormGroup, Key extends keyof Form['controls']>(): Signal<
  string | null | undefined
> => {
  const hintOrFactory = (injectControlConfig<Form, Key>().props as FieldPropsBase).hint ?? null;

  return asSignal(hintOrFactory);
};

import { FormGroup } from '@angular/forms';
import { WithSuffixAndPrefix } from '../models';
import { injectControlConfig } from './control-config.injector';
import { asSignal } from '@shared/util-rxjs-interop';
import { AsSignals } from '@shared/util-types';

export const injectSuffixAndPrefix = <Form extends FormGroup, Key extends keyof Form['controls']>(): AsSignals<{
  prefix: string | undefined;
  suffix: string | undefined;
}> => {
  const props = (injectControlConfig<Form, Key>().props as Partial<WithSuffixAndPrefix>) ?? {};

  return {
    prefix: asSignal(props.prefix),
    suffix: asSignal(props.suffix),
  };
};

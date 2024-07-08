import { FormGroup } from '@angular/forms';
import { WithSuffixAndPrefixIcons } from '../models';
import { injectControlConfig } from './control-config.injector';
import { asSignal } from '@shared/util-rxjs-interop';
import { AsSignals } from '@shared/util-types';

export const injectSuffixAndPrefixIcons = <Form extends FormGroup, Key extends keyof Form['controls']>(): AsSignals<{
  prefixIcon: string | undefined;
  suffixIcon: string | undefined;
}> => {
  const props = (injectControlConfig<Form, Key>().props as Partial<WithSuffixAndPrefixIcons>) ?? {};

  return {
    prefixIcon: asSignal(props.prefixIcon),
    suffixIcon: asSignal(props.suffixIcon),
  };
};

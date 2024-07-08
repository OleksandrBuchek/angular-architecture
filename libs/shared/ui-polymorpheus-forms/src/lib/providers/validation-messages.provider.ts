import { createInjectionToken } from '@shared/util-di';
import { Observable } from 'rxjs';
import { FormValidationParams } from '../models';
import { AsSignals } from '@shared/util-types';

export const FormValidationMessagesFactory = createInjectionToken(
  (): ((params: AsSignals<FormValidationParams>) => Record<string, Observable<string> | string>) => {
    return () => ({});
  },
  {
    allowPartialOverride: false,
    overrideResolver: (source, override) => (params: AsSignals<FormValidationParams>) => ({
      ...source(params),
      ...override(params),
    }),
    isRoot: true,
  },
);

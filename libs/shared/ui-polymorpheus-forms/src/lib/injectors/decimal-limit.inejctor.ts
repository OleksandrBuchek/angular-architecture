import { WithDecimalLimitProps } from '../models';
import { injectControlConfig } from './control-config.injector';

const DECIMAL_LIMIT_DEFAULT = 2;

export const injectDecimalLimit = (): number => {
  return (injectControlConfig().props as Partial<WithDecimalLimitProps>).decimalLimit ?? DECIMAL_LIMIT_DEFAULT;
};

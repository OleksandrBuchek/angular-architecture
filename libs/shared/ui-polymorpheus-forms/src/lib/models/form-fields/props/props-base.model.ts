import { ValueOrFactory, ValueOrReactive } from '@shared/util-types';
import { Observable } from 'rxjs';

export interface FieldPropsBase {
  placeholder?: string | Observable<string>;
  autocomplete?: string | Observable<string>;
  autofocus?: boolean;
  hint?: ValueOrFactory<ValueOrReactive<string>>;
}

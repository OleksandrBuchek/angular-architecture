import { Observable } from 'rxjs';

export type UIOption<T> = {
  value: T;
} & (
  | {
      label: string;
    }
  | {
      translationKey: string;
    }
);

export type UIOptionAsync<T> = {
  value: T;
  label$: Observable<string>;
};

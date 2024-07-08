import { inject } from '@angular/core';
import { UIOption, UIOptionAsync } from '@shared/util-types';
import { of } from 'rxjs';

export const createUIOptionAsyncMapper = () => {
  return <T>(option: UIOption<T>): UIOptionAsync<T> => {
    const label$ =
      'label' in option ? of(option.label) : of(option.translationKey);

    return {
      value: option.value,
      label$,
    };
  };
};

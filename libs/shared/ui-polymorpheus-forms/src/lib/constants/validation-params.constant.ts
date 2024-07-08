import { Signal, signal } from '@angular/core';

export const VALIDATION_PARAMS_DEFAULT: Record<string, Signal<string | number | Date>> = {
  min: signal(0),
  max: signal(0),
  minLength: signal(0),
  maxLength: signal(0),
  minDate: signal(new Date()),
  maxDate: signal(new Date()),
};

export const NULLABLE_VALIDATION_PARAMS: Record<string, Signal<null>> = {
  min: signal(null),
  max: signal(null),
  minLength: signal(null),
  maxLength: signal(null),
  minDate: signal(null),
  maxDate: signal(null),
};

import { Signal, computed } from '@angular/core';
import { AbstractControl, Validators } from '@angular/forms';

export const toMaxParameter = <TValue extends number>(getValue: Signal<TValue | null | undefined>) => {
  return computed(() => getValue() ?? Number.MAX_SAFE_INTEGER);
};

export const toMaxValidator = <TValue extends number>(getValue: Signal<TValue>) => {
  return (control: AbstractControl<TValue | null>) => Validators.max(getValue())(control);
};

export const toMinValidator = <TValue extends number>(getValue: Signal<TValue>) => {
  return (control: AbstractControl<TValue | null>) => Validators.min(getValue())(control);
};

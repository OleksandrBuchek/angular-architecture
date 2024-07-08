import { InputSignal, TemplateRef, Type } from '@angular/core';
import { SafeValue } from '@angular/platform-browser';
import { PolymorpheusComponent } from '../classes';

export type TemplateWithContext<T> = { templateRef: TemplateRef<T>; context: T };

export type PolymorpheusPrimitive = SafeValue | number | string | null | undefined;

export type PolymorpheusContent<T> = PolymorpheusComponent<Type<T>> | TemplateWithContext<T> | PolymorpheusPrimitive;

export interface WithPolymorpheusContent<T = any> {
  content: InputSignal<PolymorpheusContent<T>>;
}

import { Type } from '@angular/core';
import { PolymorpheusContent, PolymorpheusPrimitive, TemplateWithContext } from '../models';
import { isObject } from 'lodash-es';
import { PolymorpheusComponent } from '../classes';

export const isComponent = <T>(content: PolymorpheusContent<T>): content is PolymorpheusComponent<Type<T>> =>
  content instanceof PolymorpheusComponent;

export const isTemplateWithContext = <T>(content: PolymorpheusContent<T>): content is TemplateWithContext<T> =>
  isObject(content) && 'templateRef' in content && 'context' in content;

export const isPrimitive = <T>(content: PolymorpheusContent<T>): content is PolymorpheusPrimitive =>
  !isComponent(content) && !isTemplateWithContext(content);

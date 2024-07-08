import { Type, computed, inject } from '@angular/core';
import { Observable, filter, from, switchMap } from 'rxjs';
import { FORM_FIELD_COMPONENTS_MAPPER } from '../mappers';
import { FormGroupFacade } from '../facades';
import { FormFieldNameDirective } from '../directives';
import { asObservable } from '@shared/util-rxjs-interop';
import { FormGroup } from '@angular/forms';
import { FormGroupConfig } from '../models';
import { isNullOrUndefined } from '@shared/util-helpers';

export const injectFieldComponent = (): Observable<Type<unknown>> => {
  const facade = inject(FormGroupFacade);
  const formFieldNameDirective = inject(FormFieldNameDirective);

  return asObservable(
    computed(() => ({ config: facade.$config(), formFieldName: formFieldNameDirective.name() })),
  ).pipe(
    filter((params): params is { config: FormGroupConfig<FormGroup<any>>; formFieldName: string } =>
      Boolean(params.config && isNullOrUndefined(params.formFieldName) === false),
    ),
    switchMap(({ config, formFieldName }) => {
      const loadComponent = FORM_FIELD_COMPONENTS_MAPPER[config?.controls[formFieldName].type];

      return from(loadComponent());
    }),
  );
};

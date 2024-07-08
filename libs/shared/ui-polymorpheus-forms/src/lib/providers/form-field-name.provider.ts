import { Provider } from '@angular/core';
import { FormFieldNameDirective } from '../directives';

export const provideFormFieldName = (path: string): Provider => ({
  provide: FormFieldNameDirective,
  useValue: new FormFieldNameDirective(path),
});

import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

export type TypedValidatorFn<T> = (control: AbstractControl<T>) => ValidationErrors | null;
export type TypedAsyncValidatorFn<T> = (control: AbstractControl<T>) => Observable<ValidationErrors | null>;

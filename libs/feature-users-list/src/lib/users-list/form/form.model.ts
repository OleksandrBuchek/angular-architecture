import { FormControl, FormGroup } from '@angular/forms';
import { UserRole } from '../models';

export type UsersListFiltersForm = FormGroup<{
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  role: FormControl<UserRole | null>;
  startDate: FormControl<string | null>;
}>;

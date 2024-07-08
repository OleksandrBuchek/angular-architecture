import { FormGroup } from '@angular/forms';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { createInstance } from '@shared/util-helpers';

export const formStateStore = <Form extends FormGroup>() =>
  createInstance(
    signalStore(
      withState<{ formState: Form['value'] }>({ formState: {} }),
      withMethods((store) => ({
        setFormState(formState: Form['value']) {
          patchState(store, { formState });
        },
      })),
    ),
  );

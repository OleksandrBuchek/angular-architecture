import { HttpErrorResponse } from '@angular/common/http';
import { signalStoreFeature, withState, withMethods, patchState } from '@ngrx/signals';
import { PGError } from '@shared/util-error-handling';

export function withError<TError = HttpErrorResponse>() {
  return signalStoreFeature(
    withState<{ error: PGError<TError> | null }>({ error: null }),
    withMethods((store) => ({
      setError(error: PGError<TError> | null) {
        patchState(store, { error });
      },
    })),
  );
}

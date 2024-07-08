import { HttpStatusCode, HttpErrorResponse } from '@angular/common/http';
import { PGError } from './error';
import { ValueOrFactory } from '@shared/util-types';
import { getValue } from '@shared/util-helpers';

export type HttpErrorHandlersMap = Record<
  HttpStatusCode,
  (error: PGError<HttpErrorResponse>) => void
>;

const HTTP_ERROR_RESPONSE_HANDLERS_MAP_DEFAULT: Partial<HttpErrorHandlersMap> =
  {
    [HttpStatusCode.InternalServerError]: (error) => {
      console.error(error);
    },
  };

export const createHttpErrorHandlersMap = (
  override: Partial<HttpErrorHandlersMap> = {}
) => ({
  ...HTTP_ERROR_RESPONSE_HANDLERS_MAP_DEFAULT,
  ...override,
});

export const handleError = (
  error: PGError<HttpErrorResponse>,
  handlersMapOrFactory?: ValueOrFactory<Partial<HttpErrorHandlersMap>>
): void => {
  const handlersOverride = getValue(handlersMapOrFactory) ?? {};

  const handlersMap: Partial<HttpErrorHandlersMap> = {
    ...HTTP_ERROR_RESPONSE_HANDLERS_MAP_DEFAULT,
    ...handlersOverride,
  };

  const handler = handlersMap[error.origin.status as HttpStatusCode];

  handler && handler(error);
};

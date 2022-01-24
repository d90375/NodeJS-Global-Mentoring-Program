import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { BaseError } from './baseError';

export class HTTP404Error extends BaseError {
  constructor(message = getReasonPhrase(StatusCodes.NOT_FOUND)) {
    super(message, 'NOT FOUND', StatusCodes.NOT_FOUND, true);
  }
}

export class HTTP400Error extends BaseError {
  constructor(message = getReasonPhrase(StatusCodes.BAD_REQUEST)) {
    super(message, 'BAD REQUEST', StatusCodes.BAD_REQUEST, true);
  }
}

export class HTTP406Error extends BaseError {
  constructor(message = getReasonPhrase(StatusCodes.NOT_ACCEPTABLE)) {
    super(message, 'NOT ACCEPTABLE', StatusCodes.NOT_ACCEPTABLE, true);
  }
}

export class INTERNAL500Error extends BaseError {
  constructor(
    message = 'internal server error',
    name: string,
    httpCode = StatusCodes.INTERNAL_SERVER_ERROR,
    isOperational = true,
  ) {
    super(message, name, httpCode, isOperational);
  }
}

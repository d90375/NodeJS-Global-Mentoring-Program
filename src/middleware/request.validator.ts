import { validationResult } from 'express-validator';
import { Request } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { ErrorHandler } from '../common/error-handlers';

// eslint-disable-next-line import/prefer-default-export
export const validate = async (req: Request) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const status = StatusCodes.BAD_REQUEST;
    throw new ErrorHandler(status, getReasonPhrase(status), errors.array());
  }
};

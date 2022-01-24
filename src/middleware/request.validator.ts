import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { ErrorHandler } from '../common/error-handlers';

// eslint-disable-next-line import/prefer-default-export
// eslint-disable-next-line
export const validate = async (req: Request, _res: Response, _next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const status = StatusCodes.BAD_REQUEST;
    throw new ErrorHandler(status, getReasonPhrase(status), errors.array());
  }
};

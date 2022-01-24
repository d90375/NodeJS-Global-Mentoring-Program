import { Request, Response, NextFunction } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { fillRed } from './chulk';

export class ErrorHandler extends Error {
  public statusCode;

  public data;

  public message;

  constructor(statusCode: number, message: string, data: unknown) {
    super();
    this.statusCode = statusCode || StatusCodes.BAD_REQUEST;
    this.message = message;
    this.data = data;
  }
}

export const catchErrors =
  (fn: (q: Request, s: Response, n: NextFunction) => void) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return fn(req, res, next);
    } catch (err) {
      return next(err);
    }
  };

export const handleInternalError = (_req: Request, res: Response) => {
  const status = StatusCodes.INTERNAL_SERVER_ERROR;
  res.status(status).send(getReasonPhrase(status));
};

export const errorHandler = (
  _req: Request,
  _res: Response,
  next: NextFunction,
  statusCode: number,
  message: string,
) => {
  console.log(fillRed(message));
  const err = new ErrorHandler(statusCode, message, {});
  return next(err);
};

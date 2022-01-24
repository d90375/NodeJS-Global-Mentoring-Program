import { StatusCodes } from 'http-status-codes';

export class BaseError extends Error {
  public readonly name: string;

  public readonly message: string;

  public readonly statusCode: StatusCodes;

  public readonly isOperational: boolean;

  constructor(message: string, name: string, statusCode: StatusCodes, isOperational: boolean) {
    super();
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.message = message;
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}

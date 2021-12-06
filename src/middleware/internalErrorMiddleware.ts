import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { BaseError } from '../common/baseError';
import logger from '../common/logger.config';

const internalErrorMiddleware = (
  err: BaseError,
  req: express.Request,
  res: express.Response,
  _next: express.NextFunction,
) => {
  const {
    url,
    method,
    originalUrl,
    body: requestBody,
    query: requestQuery,
    params: requestParams,
  } = req;

  logger.error({
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    request: { url, originalUrl, method, requestBody, requestQuery, requestParams },
  });

  res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
};
export default internalErrorMiddleware;

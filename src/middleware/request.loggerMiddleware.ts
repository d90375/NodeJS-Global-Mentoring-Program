import express from 'express';
import logger from '../common/logger.config';

const reqLoggerMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const {
    url,
    method,
    originalUrl,
    body: requestBody,
    query: requestQuery,
    params: requestParams,
  } = req;

  logger.info('Request logger middleware', {
    url,
    originalUrl,
    method,
    requestBody,
    requestQuery,
    requestParams,
  });

  next();
};

export default reqLoggerMiddleware;

import express from 'express';

import { BaseError } from '../common/baseError';
import logger from '../common/logger.config';

const baseErrorMiddleware = (
  err: BaseError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (err instanceof BaseError) {
    logger.error({
      url: req.url,
      method: req.method,
      requestBody: req.body,
      requestParams: req.params,
      requestQuery: req.query,
      message: err.message,
      stack: err.stack,
    });

    res.status(err.statusCode || 400).json({ error: err.message });
  }

  next(err);
};

export default baseErrorMiddleware;

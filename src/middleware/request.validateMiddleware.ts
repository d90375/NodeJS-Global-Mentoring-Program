import { validationResult } from 'express-validator';
import express from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from '../common/logger.config';

const validateMiddleware = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.mapped() });

    logger.error({
      url: req.url,
      method: req.method,
      params: req.params,
      body: req.body,
      query: req.query,
      errors: errors.mapped(),
    });

    next();
  }
};

export default validateMiddleware;

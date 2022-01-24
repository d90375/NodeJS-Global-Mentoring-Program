import express from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { CONFIG } from '../common/config';

const authMiddleware = (
  req: express.Request<{}, {}, {}, {}>,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    // TODO : type should be fixed
    let authToken = req.headers.authorization as string;

    if (!authToken) {
      res.status(StatusCodes.UNAUTHORIZED);
    }

    if (authToken?.startsWith('Bearer ')) {
      authToken = authToken.slice(7, authToken.length);
    } else {
      res.status(StatusCodes.UNAUTHORIZED).send('No Bearer schema.');
    }

    jwt.verify(authToken, CONFIG.JWT_TOKEN_SECRET, (err) => {
      if (err) {
        res.status(StatusCodes.FORBIDDEN);
      }

      next();
    });
  } catch (e) {
    next(e);
  }
};

export default authMiddleware;

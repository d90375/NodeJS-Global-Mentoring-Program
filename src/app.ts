import express, { Request, Response, NextFunction } from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

import userRouter from './resources/user/user.router';
import groupRouter from './resources/group/group.router';
import { db } from './resources/base/base.model';
import { fillGreenSoft, fillRed } from './common/chulk';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

db.authenticate()
  .then(() => {
    console.log(fillGreenSoft('Connection to database has been established successfully.'));
    db.sync({ force: false });
  })
  .catch((err) => {
    console.error(fillRed('Unable to connect to the database:', err));
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/groups', groupRouter);

app.use(
  (
    err: { statusCode: number; message: string },
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    if (!err.statusCode) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
    }
    console.log(err);
    res.status(err.statusCode).send(err.message || getReasonPhrase(err.statusCode));
  },
);

export default app;

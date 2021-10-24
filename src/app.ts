import express, { Request, Response, NextFunction } from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import userRouter from './resources/user/user.router';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);

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

import express from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import cors from 'cors';
import YAML from 'yamljs';
import userRouter from './resources/user/user.router';
import groupRouter from './resources/group/group.router';
import authRouter from './resources/auth/auth.router';
import { db } from './resources/base/base.model';
import { fillGreenSoft, fillRed } from './common/chulk';

import logger from './common/logger.config';
import {
  baseErrorMiddleware,
  internalErrorMiddleware,
  loggerMiddleware,
  authMiddleware,
} from './middleware';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

db.authenticate()
  .then(() => {
    logger.info(fillGreenSoft('Connection to database has been established successfully.'));
    db.sync({ force: false });
  })
  .catch((err) => {
    logger.debug(fillRed('Unable to connect to the database:', err));
  });

app.use(cors());
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

app.use(loggerMiddleware);

app.use('/auth', authRouter);
app.use('/groups', authMiddleware, groupRouter);
app.use('/users', userRouter);

app.use(baseErrorMiddleware);

app.use(internalErrorMiddleware);

export default app;

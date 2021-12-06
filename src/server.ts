import CONFIG from './common/config';
import app from './app';
import { fillGreen, fillRed } from './common/chulk';
import { db } from './resources/base/base.model';
import logger from './common/logger.config';
import { BaseError } from './common/baseError';

app.listen(CONFIG.PORT, () => {
  logger.info(fillGreen(`App is running on http://localhost:${CONFIG.PORT}`));
});

process
  .on('unhandledRejection', (err: BaseError) => {
    logger.info(fillRed('Unhandled', err.message));
    logger.error({ message: err.message, stack: err.stack });
  })
  .on('uncaughtException', (err: BaseError) => {
    db.close();
    logger.info(fillRed('Uncaught Exception', err.message));
    logger.error({ message: err.message, stack: err.stack });
    const { exit } = process;
    exit(1);
  });

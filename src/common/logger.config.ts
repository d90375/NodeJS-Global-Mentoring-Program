import path from 'path';
import winston, { format } from 'winston';

const logFilePatchInfo = path.join('logs', 'info.log');
const logFilePatchError = path.join('logs', 'error.log');
const logFilePatchException = path.join('logs', 'exceptions.log');

const options = {
  console: {
    format: winston.format.simple(),
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
  fileInfo: {
    filename: logFilePatchInfo,
    level: 'info',
  },
  fileError: {
    filename: logFilePatchError,
    level: 'error',
  },
  exception: {
    filename: logFilePatchException,
    format: format.combine(format.uncolorize(), format.json()),
  },
};

const logger = winston.createLogger({
  format: winston.format.json(),
  levels: winston.config.npm.levels,
  transports: [
    new winston.transports.Console(options.console),
    new winston.transports.File(options.fileInfo),
    new winston.transports.File(options.fileError),
  ],
  exceptionHandlers: [new winston.transports.File(options.exception)],
  exitOnError: false,
});

export default logger;

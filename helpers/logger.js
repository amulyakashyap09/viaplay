const {
  createLogger, transports,
} = require('winston');

const logger = createLogger({
  defaultMeta: { component: 'trailer-service' },
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/combined.log' }),
  ],
  exceptionHandlers: [
    new transports.Console(),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
  ],
});
module.exports = {
  logger,
};

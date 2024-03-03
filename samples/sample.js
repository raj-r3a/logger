const Logger = require('@raj30/logger').default;

const logger = new Logger({
  logLevel: 'debug',
});

logger.info({ message: 'sample' });

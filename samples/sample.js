const Logger = require('@raj30/logger').default;

const logger = new Logger({
  logLevel: 'debug',
  metaFields: { appName: 'abc' },
});

logger.info({ message: 'sample' });

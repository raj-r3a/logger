import Logger, { LogType } from '../src';

// for pretty print in dev env's
const logger = new Logger({
  logLevel: 'debug',
  metaFields: {
    filename: __filename,
  },
  name: 'godaddy',
  redact: {
    paths: ['token'],
    censor: '**redacted**',
    remove: false,
  },
});

// for logging to file
const logger2 = new Logger({
  logLevel: 'debug',
  metaFields: {
    filename: __filename,
  },
  name: 'godaddy',
  redact: {
    paths: ['token'],
    censor: '**redacted**',
    remove: false,
  },
  transport: {
    file: {
      path: './logs',
      filenamePrefix: 'log',
    },
  },
});

logger.debug(
  {
    message: 'info message',
    data: { context: 'sample', token: 'token 3' },
    extra: { abc: 1 },
    error: new Error('custom error'),
    token: 'token 2',
  },
  'sample-id',
  {
    type: LogType.SUCCESS,
    details: { event: 'sync', entity: 'customer', token: 'token 1' },
  },
);

logger.metric({ message: 'synced a customer' }, 'id-4', {
  type: LogType.SUCCESS,
  details: { event: 'sync', entity: 'customer' },
});

logger2.info({ message: 'this will go to file' });

// for getting the pino base logger configured,
const baseLogger = logger.getBaseLogger();

logger.info({ message: 'type of baseLogger is', type: typeof baseLogger });

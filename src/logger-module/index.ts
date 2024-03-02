import pino, { stdTimeFunctions, stdSerializers } from 'pino';

import {
  JsonObject,
  LogType,
  LoggerMessageObject,
  LoggerConfig,
} from '../types/types';
import { levelFormatter } from '../logger-format';
import * as enums from '../constants/enums';
import { populateLogMessage } from '../helpers';
// import rotatingFileStream from '../transports';

export default class Logger {
  private logLevel: string;
  private name?: string;
  private metaFields: JsonObject;
  private transportOptions;
  private LoggerModule;
  private redactOptions;

  constructor(options: LoggerConfig) {
    const { logLevel, metaFields, name, transport, redact } = options;
    this.logLevel = logLevel;
    this.name = name;
    this.metaFields = metaFields;
    this.transportOptions = transport;
    this.redactOptions = redact;

    const transportConfig: any = {
      options: {},
    };
    if (this.transportOptions?.file) {
      transportConfig.target = '../transports/rotatingFileStream.js';
      transportConfig.options = {
        path: this.transportOptions.file.path,
        filenamePrefix: this.transportOptions.file.filenamePrefix,
      };
    } else {
      transportConfig.target = 'pino-pretty';
      transportConfig.options = {
        colorize: true,
        levelFirst: true,
        messageKey: 'message',
        levelLabel: 'levelLabel',
        customLevels: 'metric:45',
        useOnlyCustomProps: false,
      };
    }

    const loggerModule = pino({
      level: this.logLevel,
      name: this.name,
      base: undefined,
      redact: this.redactOptions,
      customLevels: {
        metric: 45,
      },

      messageKey: 'message',
      serializers: {
        error: stdSerializers.err,
      },
      timestamp: stdTimeFunctions.isoTime,
      mixin: async () => {
        return this.metaFields;
      },
      formatters: {
        level: levelFormatter,
        // bindings: bindingsFormatter,
      },
      transport: transportConfig,
    });

    this.LoggerModule = loggerModule;
    // return this.LoggerModule;
  }

  info(
    messageObject: LoggerMessageObject,
    tracingId: string | number,
    logType: LogType,
  ) {
    this.LoggerModule.info(
      populateLogMessage(messageObject, tracingId, logType, false),
    );
  }

  fatal(
    messageObject: LoggerMessageObject,
    tracingId: string | number,
    logType: LogType,
  ) {
    this.LoggerModule.fatal(
      populateLogMessage(messageObject, tracingId, logType),
    );
  }

  debug(
    messageObject: LoggerMessageObject,
    tracingId: string | number,
    logType: LogType,
  ) {
    this.LoggerModule.debug(
      populateLogMessage(messageObject, tracingId, logType),
    );
  }

  error(
    messageObject: LoggerMessageObject,
    tracingId: string | number,
    logType: LogType,
  ) {
    this.LoggerModule.error(
      populateLogMessage(messageObject, tracingId, logType),
    );
  }

  trace(
    messageObject: LoggerMessageObject,
    tracingId: string | number,
    logType: LogType,
  ) {
    this.LoggerModule.trace(
      populateLogMessage(messageObject, tracingId, logType, false),
    );
  }

  warn(
    messageObject: LoggerMessageObject,
    tracingId: string | number,
    logType: LogType,
  ) {
    this.LoggerModule.warn(
      populateLogMessage(messageObject, tracingId, logType),
    );
  }

  metric(
    messageObject: LoggerMessageObject,
    tracingId: string | number,
    logType: LogType,
  ) {
    this.LoggerModule.metric(
      populateLogMessage(messageObject, tracingId, logType, false),
    );
  }
}

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
  //   transport: {
  //     file: {
  //       path: './logs',
  //       filenamePrefix: 'log',
  //     },
  //   },
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
    type: enums.LogType.SUCCESS,
    details: { event: 'sync', entity: 'customer', token: 'token 1' },
  },
);

logger.metric({ message: 'synced a customer' }, 'id-4', {
  type: enums.LogType.SUCCESS,
  details: { event: 'sync', entity: 'customer' },
});

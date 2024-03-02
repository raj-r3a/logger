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

    // const transport = pino.transport({
    //   target: 'pino/file',
    //   options: { destination: `${__dirname}/app.log` },
    // });
    console.log(this.redactOptions);

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
      customLevels: {
        metric: 45,
      },
      messageKey: 'message',
      serializers: {
        error: stdSerializers.err,
      },
      timestamp: stdTimeFunctions.isoTime,
      mixin: () => {
        return this.metaFields;
      },
      formatters: {
        level: levelFormatter,
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
    data: { context: 'sample' },
    error: new Error('custom error'),
  },
  'sample-id',
  {
    type: enums.LogType.SUCCESS,
    details: { event: 'sync', entity: 'customer' },
  },
);

logger.metric({ message: 'synced a customer' }, 'id-4', {
  type: enums.LogType.SUCCESS,
  details: { event: 'sync', entity: 'customer' },
});

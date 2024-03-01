import pino, { stdTimeFunctions, stdSerializers } from 'pino';
import {
  JsonObject,
  RedactObject,
  LogType,
  LoggerMessageObject,
} from '../types/types';
import { levelFormatter } from '../logger-format';
import * as enums from '../constants/enums';
import { populateErrorObject } from '../helpers';

export default class Logger {
  private logLevel: string;
  private name?: string;
  private metaFields: JsonObject;
  private LoggerModule: pino.Logger;
  constructor(
    logLevel: string,
    metaFields: JsonObject,
    redact?: RedactObject | null,
    name?: string,
  ) {
    this.logLevel = logLevel;
    this.name = name;
    this.metaFields = metaFields;

    const loggerModule = pino({
      level: this.logLevel,
      name: this.name,
      base: undefined,
      customLevels: {
        metric: 45,
      },
      messageKey: 'message',
      //   hooks: {
      //     logMethod(inputArgs, method: LogFn, level: number | string) {
      //       //   console.log('in console', { inputArgs, method, level });
      //       Object.keys(inputArgs[0]).forEach((key) => {
      //         if (key === 'error') {
      //           const { message, stack } = stdSerializers.err(inputArgs[0][key]);
      //           inputArgs[0][key] = { message, stack };
      //         }
      //       });
      //       console.log('before sending to pino', inputArgs);
      //       return method.apply(this, inputArgs);
      //     },
      //   },
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
    });

    this.LoggerModule = loggerModule;
  }

  info(
    messageObject: LoggerMessageObject,
    tracingId: string | number,
    logType: LogType,
  ) {
    this.LoggerModule.info({ ...messageObject, tracingId, logType: logType });
  }

  fatal(
    messageObject: LoggerMessageObject,
    tracingId: string | number,
    logType: LogType,
  ) {
    if (messageObject.error) {
      populateErrorObject(messageObject);
    }
    this.LoggerModule.info({ ...messageObject, tracingId, logType: logType });
  }

  debug(
    messageObject: LoggerMessageObject,
    tracingId: string | number,
    logType: LogType,
  ) {
    if (messageObject.error) {
      populateErrorObject(messageObject);
    }
    this.LoggerModule.info({ ...messageObject, tracingId, logType: logType });
  }

  error(
    messageObject: LoggerMessageObject,
    tracingId: string | number,
    logType: LogType,
  ) {
    if (messageObject.error) {
      populateErrorObject(messageObject);
    }
    this.LoggerModule.info({ ...messageObject, tracingId, logType: logType });
  }

  trace(
    messageObject: LoggerMessageObject,
    tracingId: string | number,
    logType: LogType,
  ) {
    this.LoggerModule.info({ ...messageObject, tracingId, logType: logType });
  }

  warn(
    messageObject: LoggerMessageObject,
    tracingId: string | number,
    logType: LogType,
  ) {
    if (messageObject.error) {
      populateErrorObject(messageObject);
    }
    this.LoggerModule.info({ ...messageObject, tracingId, logType: logType });
  }
}

const logger = new Logger('debug', { filename: __filename }, null, 'goDaddy');

// logger.debug({
//   message: 'sample message',
//   error: new Error('custom err'),
// });

logger.info(
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

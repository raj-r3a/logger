import pino, { stdTimeFunctions, stdSerializers } from 'pino';
import {
  JsonObject,
  LogType,
  LoggerMessageObject,
  LoggerConfig,
} from '../types/types';
import { levelFormatter } from '../logger-format';
import { populateLogMessage } from '../helpers';

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
      transportConfig.options = this.transportOptions.file;
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
    return this;
  }

  getBaseLogger() {
    return this.LoggerModule;
  }

  info(
    messageObject: LoggerMessageObject,
    tracingId?: string | number,
    logType?: LogType,
  ) {
    this.LoggerModule.info(
      populateLogMessage(messageObject, tracingId, logType, false),
    );
  }

  fatal(
    messageObject: LoggerMessageObject,
    tracingId?: string | number,
    logType?: LogType,
  ) {
    this.LoggerModule.fatal(
      populateLogMessage(messageObject, tracingId, logType),
    );
  }

  debug(
    messageObject: LoggerMessageObject,
    tracingId?: string | number,
    logType?: LogType,
  ) {
    this.LoggerModule.debug(
      populateLogMessage(messageObject, tracingId, logType),
    );
  }

  error(
    messageObject: LoggerMessageObject,
    tracingId?: string | number,
    logType?: LogType,
  ) {
    this.LoggerModule.error(
      populateLogMessage(messageObject, tracingId, logType),
    );
  }

  trace(
    messageObject: LoggerMessageObject,
    tracingId?: string | number,
    logType?: LogType,
  ) {
    this.LoggerModule.trace(
      populateLogMessage(messageObject, tracingId, logType, false),
    );
  }

  warn(
    messageObject: LoggerMessageObject,
    tracingId?: string | number,
    logType?: LogType,
  ) {
    this.LoggerModule.warn(
      populateLogMessage(messageObject, tracingId, logType),
    );
  }

  metric(
    messageObject: LoggerMessageObject,
    tracingId?: string | number,
    logType?: LogType,
  ) {
    this.LoggerModule.metric(
      populateLogMessage(messageObject, tracingId, logType, false),
    );
  }
}

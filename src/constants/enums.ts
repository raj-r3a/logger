export enum RedactKeys {
  TOKEN = 'token',
  API_KEY = 'api-key',
}

export enum LogLevel {
  TRACE = 'trace',
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
  FATAL = 'fatal',
}

export enum LoggerConfig {
  NAME = 'name',
}

export enum Env {
  NODE_ENV = 'NODE_ENV',
  LOG_LEVEL = 'LOG_LEVEL',
  APPLICATION_NAME = 'APPLICATION_NAME',
  FILE_NAME = 'FILE_NAME',
  DATE_PATTERN = 'DATE_PATTERN',
  TIMESTAMP_FORMAT = 'TIMESTAMP_FORMAT',
}

export enum LogType {
  SUMMARY = 'SUMMARY',
  FAILURE = 'FAILURE',
  SUCCESS = 'SUCCESS',
}

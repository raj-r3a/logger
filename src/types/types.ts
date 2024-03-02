import { LogType } from '../constants/enums';

export type JsonObject = {
  [key: string]: any;
};

export type RedactObject = {
  paths: string[];
  censor?: string;
  remove?: boolean;
};

export type LoggerMessageObject = {
  message: string;
  //   error?: Error;
  [key: string]: any;
};

export type LogType = {
  type: LogType;
  details: JsonObject;
};

export type LoggerConfig = {
  logLevel: string;
  metaFields: JsonObject;
  redact?: RedactObject;
  name?: string;
  transport?: {
    prettyPrint?: true;
    file?: {
      path: string;
      filenamePrefix?: string;
    };
  };
};

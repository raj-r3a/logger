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

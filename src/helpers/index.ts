import { stdSerializers } from 'pino';
import { JsonObject } from '../types/types';

export function populateErrorObject(object: JsonObject) {
  const { message, stack } = stdSerializers.err(object.error);

  object.error = { message, stack };
  return object;
}

export function populateLogMessage(
  messageObject,
  tracingId,
  logType,
  checkError = true,
) {
  if (
    checkError &&
    messageObject.error &&
    messageObject.error instanceof Error
  ) {
    populateErrorObject(messageObject);
  }
  return {
    ...messageObject,
    error: messageObject.error,
    tracingId,
    logType,
  };
}

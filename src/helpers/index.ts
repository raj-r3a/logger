import { stdSerializers } from 'pino';
import { JsonObject } from '../types/types';

export function populateErrorObject(object: JsonObject) {
  const { message, stack } = stdSerializers.err(object.error);

  object.error = { message, stack };
  return object;
}

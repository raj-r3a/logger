import { LogFn, stdSerializers } from 'pino';
import { JsonObject } from '../types/types';

export function levelFormatter(label, number) {
  return { level: label };
}

export function bindingsFormatter(bindings) {
  return {};
}

export function logFormatMethod(
  context,
  inputArgs: Array<string | number | JsonObject | boolean>,
  method: LogFn,
  level: number | string,
) {
  console.log('in console', { inputArgs, method, level });
  Object.keys(inputArgs[0]).forEach((key) => {
    if (key === 'error') {
      const { message, stack } = stdSerializers.err(inputArgs[0][key]);
      inputArgs[0][key] = { message, stack };
    }
  });

  //   return method.apply(context, inputArgs);
}

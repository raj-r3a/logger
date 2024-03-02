import { LogFn, stdSerializers } from 'pino';

export function levelFormatter(label, number) {
  return { level: label };
}

export function bindingsFormatter(bindings) {
  return {};
}

export function logFormatMethod(
  context,
  inputArgs: Array<any>,
  method: LogFn,
  level: number | string,
) {
  Object.keys(inputArgs[0]).forEach((key) => {
    if (key === 'error') {
      const { message, stack } = stdSerializers.err(inputArgs[0][key]);
      inputArgs[0][key] = { message, stack };
    }
  });

  //   return method.apply(context, ...inputArgs);
}

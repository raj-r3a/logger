# Logger

Hi! This Logger is built on top of [Pino](https://www.npmjs.com/package/pino) .

It exposes all the log levels same as that of Pino in the following order except for silent.

**Level - Weight**

trace - 10

debug - 20

info - 30

metric - 45

warn - 40

error - 50

fatal - 60

## Sample Usage

Please refer the [samples](https://github.com/raj-r3a/logger/blob/main/samples) section in the repository

## Specification

All the level methods of this logger accepts 3 params in the same order,

1. Message Object,

2. Tracing Id (optional),

3. Type of Log indicating failure, success log etc.., (optional)

Please refer the exported types or the types file inside [types](https://github.com/raj-r3a/logger/blob/main/src/types/types.ts) file for more info on the params structure.

**Note**

1. Instance of Error is only allowed on the key "error" in the messageObject only.

2. The error key in messageObject will be stringified to {message, stack } only in warn, debug, error, fatal. Other level doesn't suppport Error instance in the log.

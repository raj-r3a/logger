import { createStream } from 'rotating-file-stream';
// import pino from 'pino';

export function rotatingFileStream(options: {
  filename?: string | undefined;
  path?: string | undefined;
  size?: string;
  interval?: string;
  compress?: string;
  maxFiles?: number;
  filenamePrefix?: string;
}) {
  console.log(' in here');
  const date = new Date();
  const { filename, path, size, interval, maxFiles, filenamePrefix } = options;

  const formattedDate = date.toISOString().slice(0, 16).replace('T', '-');
  const filenameConstructed = filename
    ? path + filename
    : `${path || __dirname + (filenamePrefix || '/logs')}/default-${formattedDate}.log`;
  console.log({ filename, path, options, filenameConstructed });

  const stream = createStream(filenameConstructed, {
    size: size || '10M',
    interval: interval || '1d',
    maxFiles: maxFiles || 2,
  });

  return stream;
}

// const stream = rotatingFileStream();

// stream.write('1234-loggggggeddd');

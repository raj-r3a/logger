const { createStream } = require('rotating-file-stream');

function rotatingFileStream(options = {}) {
  const date = new Date();
  const { filename, path, size, interval, maxFiles, filenamePrefix } = options;

  const formattedDate = date.toISOString().slice(0, 16).replace('T', '-');
  const filenameConstructed = filename
    ? path + filename
    : `${(path || __dirname) + '/' + (filenamePrefix || 'default')}-${formattedDate}.log`;

  const stream = createStream(filenameConstructed, {
    size: size || '10M',
    interval: interval || '1d',
    maxFiles: maxFiles || 2,
  });

  return stream;
}

rotatingFileStream({
  path: './logs',
  filenamePrefix: 'log',
});

module.exports = rotatingFileStream;

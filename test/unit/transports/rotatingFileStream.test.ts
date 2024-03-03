import rotatingFileStream from '../../../src/transports/rotatingFileStream.js';
import streamNode from 'node:stream';
import { describe, expect, it } from '@jest/globals';

describe('rotatingFileStream', () => {
  it('creates a rotating file stream with default options', () => {
    const stream = rotatingFileStream();

    expect(stream).toBeTruthy();
    expect(stream).toBeInstanceOf(streamNode);
  });

  it('creates a rotating file stream with custom options', () => {
    const options = {
      filename: 'custom.log',
      path: '/custom/path/',
      size: '5M',
      interval: '12h',
      maxFiles: 5,
      filenamePrefix: 'custom-prefix',
    };

    const stream = rotatingFileStream(options);

    expect(stream).toBeTruthy();
    expect(stream).toBeInstanceOf(streamNode);
  });
});

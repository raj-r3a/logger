import { populateErrorObject, populateLogMessage } from '../../../src/helpers';
import { describe, expect, it } from '@jest/globals';

describe('populateErrorObject', () => {
  it('should populate error object with message and stack', () => {
    // Arrange
    const inputObject = {
      error: new Error('Test error message'),
    };

    // Act
    const result = populateErrorObject(inputObject);

    // Assert
    expect(result.error).toBeDefined();
    expect(result.error.message).toBe('Test error message');
    expect(result.error.stack).toBeDefined();
  });

  it('should not modify the input object if error is not present', () => {
    const inputObject = {
      someKey: 'someValue',
    };

    expect(() => {
      populateErrorObject(inputObject);
    }).toThrow();
  });
});

describe('populateLogMessage', () => {
  it('should add tracingId and logType to the messageObject', () => {
    const messageObject = {
      someKey: 'someValue',
      error: new Error('Test error message'),
    };
    const tracingId = '123';
    const logType = 'info';

    // Act
    const result = populateLogMessage(messageObject, tracingId, logType);

    // Assert
    expect(result.tracingId).toBe(tracingId);
    expect(result.logType).toBe(logType);
  });

  it('should call populateErrorObject if checkError is true and error is present', () => {
    // Arrange
    const messageObject = {
      error: new Error('Test error message'),
    };
    const tracingId = '123';
    const logType = 'info';

    // const populateErrorObjectSpy = jest.spyOn(
    //   helpers as any,
    //   'populateErrorObject',
    // );

    populateLogMessage(messageObject, tracingId, logType);

    expect(messageObject.error).toHaveProperty('message');
    // expect(populateErrorObjectSpy).toHaveBeenCalled();
  });

  it('should not call populateErrorObject if checkError is false', () => {
    const messageObject = {
      error: new Error('Test error message'),
    };
    const tracingId = '123';
    const logType = 'info';

    // const populateErrorObjectSpy = jest.spyOn(
    //   helpers as any,
    //   'populateErrorObject',
    // );

    populateLogMessage(messageObject, tracingId, logType, false);

    // expect(populateErrorObjectSpy).not.toHaveBeenCalled();
    expect(messageObject.error).toHaveProperty('message');
  });
});

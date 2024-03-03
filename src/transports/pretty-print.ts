const prettyPrintConfig = {
  target: 'pino-pretty',
  options: {
    colorize: true,
    levelFirst: true,
    messageKey: 'message',
    levelLabel: 'levelLabel',
    customLevels: 'metric:45',
    useOnlyCustomProps: false,
  },
};

export default prettyPrintConfig;

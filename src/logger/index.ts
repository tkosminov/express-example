import { createLogger, format, transports } from 'winston';

const infoTransport = new transports.Console({
  level: 'info',
  format: format.combine(format.colorize(), format.simple()),
});

const logger = createLogger({
  transports: [infoTransport],
});

export default logger;

import { NextFunction, Request, Response } from 'express';

import config from 'config';

import { getHttpVersion, getIp, getReferrer, getResponseHeader, getUrl, getUserAgent } from '../helpers';
import logger from '../logger';

const loggerSettings = config.get<ILoggerSettings>('LOGGER_SETTINGS');

function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
  if (loggerSettings.silence.includes(getUrl(req))) {
    return next();
  }

  const date = new Date().toISOString();
  const startTime = process.hrtime();

  res.on('finish', () => {
    const diff = process.hrtime(startTime);

    const message = `[${date}] ${getIp(req) || '-'} - "${req.method || '-'} ${getUrl(req) || '-'} HTTP/${getHttpVersion(
      req
    ) || '-'}" ${res.statusCode || '-'} ${getResponseHeader(res, 'content-length') || '-'} "${getReferrer(req) ||
      '-'}" "${getUserAgent(req) || '-'}" - ${(diff[0] * 1e3 + diff[1] * 1e-6).toFixed(4)} ms`;

    if (res.statusCode < 300) {
      logger.info(message);
    } else if (res.statusCode < 500) {
      logger.warn(message);
    } else {
      logger.error(message);
    }
  });

  next();
}

export default loggerMiddleware;

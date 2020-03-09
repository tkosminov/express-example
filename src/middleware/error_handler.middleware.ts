import { NextFunction, Request, Response } from 'express';

import HttpException from '../exceptions/http.exception';

function errorHandlerMiddleware(err: HttpException, _req: Request, res: Response, next: NextFunction) {
  const status = err.status || 500;
  const message = err.message || 'InternalServerError';

  if (res.headersSent) {
    return next(err);
  }

  res.status(status).send({ status, message });
}

export default errorHandlerMiddleware;

import { NextFunction, Request, Response } from 'express';

function asyncErrorMiddleware(
  fn: (req: Request, res: Response, next: NextFunction) => void
): (req: Request, res: Response, next: NextFunction) => void {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

export default asyncErrorMiddleware;

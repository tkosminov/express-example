import { NextFunction, Request, Response } from 'express';

import { plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';
import { validate, ValidationError } from 'class-validator';

import { badRequest } from '../exceptions';

function validationMiddleware<T>(type: ClassType<T>, skipMissingProperties = false) {
  return (req: Request, _res: Response, next: NextFunction) => {
    validate(plainToClass(type, req.body), { skipMissingProperties }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message = errors.map(error => Object.values(error.constraints)).join(', ');

        next(badRequest(message));
      } else {
        next();
      }
    });
  };
}

export default validationMiddleware;

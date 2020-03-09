import { NextFunction, Request, Response } from 'express';

import config from 'config';
import { verify } from 'jsonwebtoken';

import { jwtExpiredSignature, unauthorized } from '../exceptions';
import { getAction, getAuthorization } from '../helpers';

import User from '../database/models/user';

interface IPayload {
  readonly _id: string;
  readonly email: string;
}

const authSettings = config.get<IAuthSettings>('AUTH_SETTINGS');

async function authMiddleware(req: Request, _res: Response, next: NextFunction) {
  if (authSettings.notCheck.includes(getAction(req))) {
    return next();
  }

  const token = getAuthorization(req);

  if (token) {
    try {
      const payload = verify(token, authSettings.jwtSecret) as IPayload;

      const user = await User.findById(payload._id);

      if (user) {
        req.headers.current_user_id = user._id;

        return next();
      }
    } catch (error) {
      return next(jwtExpiredSignature());
    }
  }

  return next(unauthorized());
}

export default authMiddleware;

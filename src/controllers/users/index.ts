import { Request, Response } from 'express';

import config from 'config';
import { sign } from 'jsonwebtoken';

import User from '../../database/models/user';
import { unauthorized } from '../../exceptions';
import { checkPassword } from '../../helpers/password';

const authSettings = config.get<IAuthSettings>('AUTH_SETTINGS');

export async function auth(req: Request, res: Response) {
  const user = await User.findOne({ email: req.body.email });

  if (!user || !checkPassword(user.password, req.body.password)) {
    throw unauthorized();
  }

  const jwt = sign({ _id: user._id, email: user.email }, authSettings.jwtSecret, {
    expiresIn: `${authSettings.jwtLifeTime}m`,
  });

  res.status(200).send({
    token_type: 'jwt',
    jwt,
    expires_in: new Date(new Date().setMinutes(new Date().getMinutes() + authSettings.jwtLifeTime)).toISOString(),
  });
}

export default {
  auth,
};

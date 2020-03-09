import { Request, Response } from 'express';

export async function healthz(_req: Request, res: Response): Promise<Response> {
  return res.status(200).send({ msg: 'OK' });
}

export default {
  healthz,
};

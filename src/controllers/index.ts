import { Router } from 'express';

import asyncErrorMiddleware from '../middleware/async_error.middleware';
import validationMiddleware from '../middleware/validation.middleware';

const router: Router = Router();

import { healthz } from './healthz';
router.get('/healthz', asyncErrorMiddleware(healthz));

import users from './users';
import { UserAuthDTO } from './users/dto/auth.dto';
router.post('/auth', validationMiddleware(UserAuthDTO), asyncErrorMiddleware(users.auth));

export default router;

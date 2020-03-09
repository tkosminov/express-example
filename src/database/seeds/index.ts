import logger from '../../logger';
import connectDB, { dropCollections } from '../index';

import User from '../models/user';

import userSeeds from './user';

async function seed() {
  const connection = await connectDB();

  await dropCollections([User]);

  logger.info(`[MongoDB] collections cleared`);

  await Promise.all([...userSeeds()]);

  logger.info(`[MongoDB] seed completed`);

  await connection.close();

  logger.info(`[MongoDB] closed`);
}

seed();

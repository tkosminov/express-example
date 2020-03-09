import config from 'config';
import { MongoError } from 'mongodb';
import mongoose, { ConnectionOptions, Document, Model } from 'mongoose';

import logger from '../logger';

const dbSettings = config.get<IDatabaseSettings & { options?: ConnectionOptions }>('DB_SETTINGS');

/**
 * Connect to database
 */
async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  await mongoose.connect(dbSettings.host, dbSettings.options).catch((err: MongoError) => {
    logger.error('Mongoose connect Error!');

    if (err.message && err.message.includes('failed to connect to server')) {
      logger.warn('Please start mongo server!');
    } else {
      logger.error(err);
    }

    process.exit(1);
  });

  logger.info(`[MongoDB] connected to ${dbSettings.host}`);

  return mongoose.connection;
}

/**
 * Drop database
 */
export async function dropDB() {
  const connection = await connectDB();

  await connection.db.dropDatabase();
  await connection.close();
}

/**
 * Clear database tables
 * @param models array
 */
export async function dropCollections(models: Array<Model<Document, {}>>) {
  const connection = await connectDB();

  const promises = models.map(async model => {
    await connection.dropCollection(model.collection.collectionName);
  });

  await Promise.all(promises);
}

export default connectDB;

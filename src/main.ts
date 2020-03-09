import express from 'express';

import { json, urlencoded } from 'body-parser';
import config from 'config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';

import authMiddleware from './middleware/auth.middleware';
import corsMiddleware from './middleware/cors.middleware';
import errorHandlerMiddleware from './middleware/error_handler.middleware';
import loggerMiddleware from './middleware/logger.middleware';

import router from './controllers';
import connectDB from './database';
import logger from './logger';

const appSettings = config.get<IAppSettings>('APP_SETTINGS');

class Server {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.initialize();
  }

  private initialize() {
    this.app.use(helmet());
    this.app.use(cors(corsMiddleware));

    this.app.use(loggerMiddleware);

    this.app.use(json({ limit: appSettings.body_size_limit }));
    this.app.use(
      urlencoded({
        limit: appSettings.body_size_limit,
        extended: true,
        parameterLimit: appSettings.body_parameter_limit,
      })
    );
    this.app.use(cookieParser());

    this.app.use(authMiddleware);

    this.app.use(express.static('../public'));
    this.app.use(router);

    this.app.use(errorHandlerMiddleware);

    connectDB().then(_connection => {
      this.app.listen(appSettings.port, () => {
        logger.info(`[Server] listening on ${appSettings.port} port`);
      });
    });
  }
}

export default new Server().app;

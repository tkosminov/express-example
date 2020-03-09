import config from 'config';
import { CorsOptions } from 'cors';

import { unauthorized } from '../exceptions';

const corsSettings = config.get<ICorsSettings>('CORS_SETTINGS');

export default {
  origin: (origin, callback) => {
    if (!origin || !corsSettings.allowedOrigins.length || corsSettings.allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(unauthorized('CorsNotAllowedAccess'));
    }
  },
  credentials: corsSettings.allowedCredentials,
} as CorsOptions;

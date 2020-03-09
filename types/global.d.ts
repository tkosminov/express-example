interface IAppSettings {
  readonly port: number;
  readonly body_size_limit: string;
  readonly body_parameter_limit: number;
}

interface ILoggerSettings {
  readonly level: string;
  readonly silence: string[];
}

interface IDatabaseSettings {
  readonly host: string;
}

interface IAuthSettings {
  readonly jwtLifeTime: number;
  readonly jwtSecret: string;
  readonly notCheck: string[];
}

interface ICorsSettings {
  readonly allowedCredentials: boolean;
  readonly allowedOrigins: string[];
  readonly allowedMethods: string[];
  readonly allowedHeaders: string[];
}
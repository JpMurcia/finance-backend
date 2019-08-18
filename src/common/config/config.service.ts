import { parse } from 'dotenv';
import * as Joi from 'joi';
import { existsSync, readFileSync } from 'fs';
import { Logger } from '@nestjs/common';

interface EnvConfig {
  [prop: string]: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;
  private readonly filePath = `.env`;
  private logger = new Logger(`ConfigService`, true)

  constructor() {
    if (!existsSync(this.filePath)) {
      this.logger.error(`Config file ${this.filePath} not exist`)
      throw new Error();
    }
    const config = parse(readFileSync(this.filePath, 'utf-8'));
    this.envConfig = this.validateInput(config);
  }

  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string(),
      APP_PORT: Joi.number().default(3000),
      APP_HOST_SERVER: Joi.string(),
      APP_HOST_CLIENT: Joi.string(),
      APP_URL_PREFIX: Joi.string(),
      JWT_KEY: Joi.string(),
      
      DB_TYPE: Joi.string(),
      DB_HOST: Joi.string().default('localhost'),
      DB_PORT: Joi.number().default(5432),
      DB_USERNAME: Joi.string(),
      DB_PASSWORD: Joi.string(),
      DB_DATABASE: Joi.string()
    });

    const { error, value: validatedEnvConfig } = Joi.validate(envConfig, envVarsSchema, );
    if (error) {
      this.logger.error(`Config validation error: ${error.message}`)
      throw new Error();
    }
    return validatedEnvConfig;
  }

  get app(): any {
    return {
      appPort: parseInt(this.envConfig.APP_PORT),
      appHostServer: this.envConfig.APP_HOST_SERVER,
      appHostClient: this.envConfig.APP_HOST_CLIENT,
      appUrlPrefix: this.envConfig.APP_URL_PREFIX,
      jwtKey: this.envConfig.JWT_KEY,
      jwtExpires: 3600
    }
  }

  get env(): string {
    return process.env.NODE_ENV || 'development'
  }

  get orm_config(): any {
    return {
      name: 'default',
      type: this.envConfig.DB_TYPE,
      host: this.envConfig.DB_HOST,
      port: this.envConfig.DB_PORT,
      username: this.envConfig.DB_USERNAME,
      password: this.envConfig.DB_PASSWORD,
      database: this.envConfig.DB_DATABASE,
      entities: ["entities/*{.js,.ts}"],
      synchronize: true,
      logging: false
    }
  }
}

export default new ConfigService()
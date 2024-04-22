import { type ConfigType } from '@nestjs/config';

import { type app, type database, type jwt, type redis } from './configs';

export interface IConfiguration {
  app: ConfigType<typeof app>;
  database: ConfigType<typeof database>;
  jwt: ConfigType<typeof jwt>;
  redis: ConfigType<typeof redis>;
}

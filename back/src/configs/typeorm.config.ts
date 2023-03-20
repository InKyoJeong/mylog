import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.RDS_HOST,
  port: 5432,
  username: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: 'mylog-app',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};

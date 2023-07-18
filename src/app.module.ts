import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envConfig } from './config/env.config';
import { PostgresqlConfig } from './config/postgresql-config/postgresql-config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: PostgresqlConfig
    })
  ],
  controllers: [],
  providers: [PostgresqlConfig],
})
export class AppModule { }

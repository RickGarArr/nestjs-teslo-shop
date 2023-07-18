import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist';
import { POSTGRES_DB, POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_PORT, POSTGRES_USERNAME, SYNCHRONIZE } from '../env.constants';

@Injectable()
export class PostgresqlConfig implements TypeOrmOptionsFactory {

    constructor(
        private readonly configService: ConfigService
    ) { }
    
    createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
        return {
            type: 'postgres',
            host: this.configService.getOrThrow(POSTGRES_HOST),
            port: +this.configService.getOrThrow(POSTGRES_PORT),
            username: this.configService.getOrThrow(POSTGRES_USERNAME),
            password: this.configService.getOrThrow(POSTGRES_PASSWORD),
            database: this.configService.getOrThrow(POSTGRES_DB),
            synchronize: this.configService.get(SYNCHRONIZE),
            autoLoadEntities: true,
        }
    }

}

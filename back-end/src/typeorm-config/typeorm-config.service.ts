import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeormConfigService implements TypeOrmOptionsFactory {
	constructor(private config: ConfigService) {}
	createTypeOrmOptions(): TypeOrmModuleOptions {
		return {
			type: 'postgres',
			host: this.config.get('DATABASE_HOST'),
			port: +this.config.get('DATABASE_PORT'),
			username: this.config.get('DATABASE_USERNAME'),
			password: this.config.get('DATABASE_PASSWORD'),
			database: this.config.get('DATABASE_NAME'),
			entities: [__dirname + '/../**/*.entity{.ts,.js}'], // seeding workarround for loading entities
			autoLoadEntities: true,
			logger: 'file',
			logging: true,
			// dropSchema: true, // TODO: remove this in production or when you want to persist data
			synchronize: true,
		};
	}
}

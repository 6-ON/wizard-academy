import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeormConfigService implements TypeOrmOptionsFactory {
	constructor(private config: ConfigService) {}
	createTypeOrmOptions(): TypeOrmModuleOptions {
		console.log(this.config.get('DATABASE_HOST'));

		return {
			type: 'postgres',
			host: this.config.get('DATABASE_HOST'),
			port: this.config.get('DATABASE_PORT'),
			username: this.config.get('DATABASE_USERNAME'),
			password: this.config.get('DATABASE_PASSWORD'),
			database: this.config.get('DATABASE_NAME'),
			autoLoadEntities: true,
			synchronize: true,
		};
	}
}

import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UniversityModule } from './university/university.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormConfigModule } from './typeorm-config/typeorm-config.module';
import { TypeormConfigService } from './typeorm-config/typeorm-config.service';

@Module({
	imports: [
		AuthModule,
		UniversityModule,
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		TypeOrmModule.forRootAsync({
			imports: [TypeormConfigModule],
			useExisting: TypeormConfigService,
		}),
	],
	controllers: [],
	providers: [],
})
export class AppModule {}

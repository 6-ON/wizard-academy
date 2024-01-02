import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UniversityModule } from './university/university.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormConfigModule } from './typeorm-config/typeorm-config.module';
import { TypeormConfigService } from './typeorm-config/typeorm-config.service';
import { DepartmentModule } from './department/department.module';

import { UserModule } from './user/user.module';
import { DeanModule } from './dean/dean.module';


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
		DepartmentModule,
		UserModule,
		DeanModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}

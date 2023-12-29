import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UniversityModule } from './university/university.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormConfigModule } from './typeorm-config/typeorm-config.module';
import { TypeormConfigService } from './typeorm-config/typeorm-config.service';
import { DepartmentsController } from './department/department.controller';
import { DepartmentModule } from './department/department.module';

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
	],
	controllers: [DepartmentsController],
	providers: [],
})
export class AppModule {}

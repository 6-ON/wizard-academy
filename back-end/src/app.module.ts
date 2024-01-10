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
import { StudentModule } from './student/student.module';
import { SpecialtyModule } from './specialty/specialty.module';
import { SubjectModule } from './subject/subject.module';


@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [TypeormConfigModule],
			useExisting: TypeormConfigService,
		}),
		AuthModule,
		UniversityModule,
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		DepartmentModule,
		UserModule,
		DeanModule,
		StudentModule,
		SpecialtyModule,
		SubjectModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}

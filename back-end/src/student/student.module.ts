import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { UserModule } from '@/user/user.module';
import { UniversityModule } from '@/university/university.module';
import { SpecialtyModule } from '@/specialty/specialty.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([Student]),
		UserModule,
		UniversityModule,
		SpecialtyModule,
	],
	controllers: [StudentController],
	providers: [StudentService],
})
export class StudentModule {}

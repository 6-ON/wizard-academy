import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { UserModule } from '@/user/user.module';
import { UniversityModule } from '@/university/university.module';

@Module({
	imports: [TypeOrmModule.forFeature([Student]), UserModule, UniversityModule],
	controllers: [StudentController],
	providers: [StudentService],
})
export class StudentModule {}

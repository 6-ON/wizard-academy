import {
	Injectable,
	NotFoundException,
	UnprocessableEntityException,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UniversityService } from '@/university/university.service';
import { Role } from '@/user/roles';

@Injectable()
export class StudentService {
	constructor(
		@InjectRepository(Student)
		private studentRepo: Repository<Student>,
		private universityService: UniversityService,
	) {}
	async create(createStudentDto: CreateStudentDto) {
		const { universityId, ...rest } = createStudentDto;
		const university = await this.universityService.findOne(universityId);
		if (!university) {
			throw new UnprocessableEntityException('University not found');
		}
		rest.user.role = Role.STUDENT;

		let student = this.studentRepo.create({ ...rest, university });
		student = await this.studentRepo.save(student);
		delete student.user.password;
		return student;
	}

	async findAll() {
		const students =  await this.studentRepo.find();
		return students;
	}

	async findOne(id: number) {
		const student = await this.studentRepo.findOne({
			where: { id },
			relations: ['user', 'university'],
		});
		if (!student) {
			throw new NotFoundException('Student not found');
		}
		return student;
	}

	async update(id: number, updateStudentDto: UpdateStudentDto) {
		const student = await this.findOne(id);
		Object.assign(student, updateStudentDto);
		return this.studentRepo.save(student);
	}

	async remove(id: number) {
		const student = await this.findOne(id);
		this.studentRepo.delete(student)
		return { deleted: true, message: 'Student deleted' };
	}
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './entities/subject.entity';

@Injectable()
export class SubjectService {
	constructor(
		@InjectRepository(Subject)
		private subjectRepository: Repository<Subject>,
	) {}
	create(createSubjectDto: CreateSubjectDto) {
		const subject = this.subjectRepository.create(createSubjectDto);
		return this.subjectRepository.save(subject);
	}

	findAll() {
		return this.subjectRepository.find();
	}

	async findOne(id: number) {
		const subject = await this.subjectRepository.findOneBy({ id });
		if (!subject) throw new NotFoundException('Subject not found');
		return subject;
	}

	async update(id: number, updateSubjectDto: UpdateSubjectDto) {
		let subject = await this.findOne(id);
		subject = this.subjectRepository.merge(subject, updateSubjectDto);
		return this.subjectRepository.save(subject);
	}

	async remove(id: number) {
		const subject = await this.findOne(id);
		return this.subjectRepository.remove(subject);
	}
}

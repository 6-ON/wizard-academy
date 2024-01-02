import { Injectable } from '@nestjs/common';
import { CreateDeanDto } from './dto/create-dean.dto';
import { UpdateDeanDto } from './dto/update-dean.dto';
import { Repository } from 'typeorm';
import { Dean } from './entities/dean.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '@/user/roles';

@Injectable()
export class DeanService {
	constructor(
		@InjectRepository(Dean) private deanRepository: Repository<Dean>,
	) {}

	async create(createDeanDto: CreateDeanDto) {
		createDeanDto.user.role = Role.DEAN;
		const dean = this.deanRepository.create(createDeanDto);
		const record = await this.deanRepository.save(dean);
		delete record.user.password;
		return record;
	}

	findAll() {
		return this.deanRepository.find();
	}

	findOne(id: number) {
		return this.deanRepository.findOneBy({ id });
	}
	update(id: number, updateDeanDto: UpdateDeanDto) {
		return this.deanRepository.update(id, updateDeanDto);
	}
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Specialty } from './entities/specialty.entity';

@Injectable()
export class SpecialtyService {
	constructor(
		@InjectRepository(Specialty)
		private specialityRepo: Repository<Specialty>,
	) {}

	async create(createSpecialtyDto: CreateSpecialtyDto) {
		const specialty = new Specialty();
		specialty.name = createSpecialtyDto.name;
		specialty.description = createSpecialtyDto.description;
		return this.specialityRepo.save(specialty);
	}

	findAll() {
		return this.specialityRepo.find();
	}

	async findOne(id: number) {
		const specialty = await this.specialityRepo.findOne({
			where: { id },
		});
		if (!specialty) {
			throw new NotFoundException('Specialty not found');
		}
		return specialty;
	}

	async update(id: number, updateSpecialtyDto: UpdateSpecialtyDto) {
		const specialty = await this.findOne(id);
		Object.assign(specialty, updateSpecialtyDto);
		return await this.specialityRepo.save(specialty);
	}
	async remove(id: number) {
		const specialty = await this.findOne(id);
		this.specialityRepo.delete(specialty);
		return { deleted: true, message: 'Specialty deleted'} ;
	}
}

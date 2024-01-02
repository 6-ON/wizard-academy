import { Injectable } from '@nestjs/common';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';
import { Repository } from 'typeorm';
import { University } from './entities/university.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '@/user/user.service';

@Injectable()
export class UniversityService {
	constructor(
		@InjectRepository(University)
		private universityRepo: Repository<University>,
		private userService: UserService,
	) {}
	async create(createUniversityDto: CreateUniversityDto) {
		const university = new University();
		university.name = createUniversityDto.name;
		university.adress = createUniversityDto.adress;
		const user = await this.userService.findOne(createUniversityDto.deanId);
		if (!user) {
			throw new Error('User not found');
		}
		university.dean = user;
		return this.universityRepo.save(university);
	}

	async findAll() {
		return this.universityRepo.find();
	}

	findOne(id: number) {
		return this.universityRepo.findOne({ where: { id }, relations: ['dean'] });
	}

	async update(id: number, updateUniversityDto: UpdateUniversityDto) {
		const university = await this.universityRepo.findOne({ where: { id } });
		university.name = updateUniversityDto.name;
		university.adress = updateUniversityDto.adress;
		return this.universityRepo.save(university);
	}

	remove(id: number) {
		return this.universityRepo.delete({ id });
	}
}

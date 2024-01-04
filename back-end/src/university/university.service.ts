import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
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
			throw new UnprocessableEntityException('User not found');
		}
		university.dean = user;
		return this.universityRepo.save(university);
	}

	async findAll() {
		return this.universityRepo.find();
	}

	async findOne(id: number) {
		const university = await this.universityRepo.findOne({
			where: { id },
			relations: ['dean'],
		});
		if (!university) {
			throw new NotFoundException('University not found');
		}
		return university;
	}

	async update(id: number, updateUniversityDto: UpdateUniversityDto) {
		const university = await this.universityRepo.findOne({ where: { id } });
		if (!university) {
			throw new NotFoundException('University not found');
		}
		Object.assign(university, updateUniversityDto);
		return this.universityRepo.save(university);
	}

	async remove(id: number) {
		const university = this.findOne(id);
		if (!university) {
			throw new NotFoundException('University not found');
		}
		await this.universityRepo.delete({ id });
	}
}

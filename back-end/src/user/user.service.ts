import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './roles';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
	) {}

	create(createUserDto: CreateUserDto, role: Role) {
		const user = this.userRepository.create({ ...createUserDto, role });
		return this.userRepository.save(user);
	}

	findAll() {
		return this.userRepository.find();
	}

	async findOne(id: number) {
		const user: User = await this.userRepository.findOneBy({ id });
		if (!user) {
			throw new NotFoundException(`User #${id} not found`);
		}
		return user;
	}

	async update(id: number, updateUserDto: UpdateUserDto) {
		await this.findOne(id); // for the NotFoundException
		return await this.userRepository.update(id, updateUserDto);
	}

	async remove(id: number) {
		await this.findOne(id); // for the NotFoundException
		return await this.userRepository.delete(id);
	}
}

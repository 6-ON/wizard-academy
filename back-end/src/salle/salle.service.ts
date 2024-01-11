import { Injectable } from '@nestjs/common';
import { CreateSalleDto } from './dto/create-salle.dto';
import { UpdateSalleDto } from './dto/update-salle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Salle } from './entities/salle.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class SalleService {
  constructor (
    @InjectRepository(Salle)
    private readonly salleRepository: Repository<Salle>,
  ) {}

  create(createSalleDto: CreateSalleDto) {
    const salle = this.salleRepository.create(createSalleDto);
    return this.salleRepository.save(salle);
  }

  findAll() {
    return this.salleRepository.find();
  }

  async findOne(id: number) {
		const salle = await this.salleRepository.findOneBy({ id });
		if (!salle) throw new NotFoundException('Salle not found');
		return salle;
	}

  async update(id: number, updateSalleDto: UpdateSalleDto) {
    let salle = await this.findOne(id);
    salle = this.salleRepository.merge(salle, updateSalleDto);
    return this.salleRepository.save(salle);
  }

   async remove(id: number) {
    const salle = await this.findOne(id);
    return this.salleRepository.remove(salle);
  }
}

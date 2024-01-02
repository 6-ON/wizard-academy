import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { DeanService } from './dean.service';
import { CreateDeanDto } from './dto/create-dean.dto';
import { UpdateDeanDto } from './dto/update-dean.dto';

@Controller('dean')
export class DeanController {
	constructor(private readonly deanService: DeanService) {}

	@Post()
	create(@Body() createDeanDto: CreateDeanDto) {
		return this.deanService.create(createDeanDto);
	}

	@Get()
	findAll() {
		return this.deanService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.deanService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateDeanDto: UpdateDeanDto) {
		return this.deanService.update(+id, updateDeanDto);
	}
}

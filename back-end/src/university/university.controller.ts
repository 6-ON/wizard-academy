import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
} from '@nestjs/common';
import { UniversityService } from './university.service';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';
import { UniversityOwnerGuard } from './guards';
import { JwtGuard } from '@/auth/guards';

@Controller('university')
export class UniversityController {
	constructor(private readonly universityService: UniversityService) {}

	@Post()
	create(@Body() createUniversityDto: CreateUniversityDto) {
		return this.universityService.create(createUniversityDto);
	}

	@Get()
	findAll() {
		return this.universityService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.universityService.findOne(+id);
	}

	@Patch(':id')
	@UseGuards(JwtGuard, UniversityOwnerGuard)
	update(
		@Param('id') id: string,
		@Body() updateUniversityDto: UpdateUniversityDto,
	) {
		return this.universityService.update(+id, updateUniversityDto);
	}

	@Delete(':id')
	@UseGuards(JwtGuard, UniversityOwnerGuard)
	remove(@Param('id') id: string) {
		return this.universityService.remove(+id);
	}
}

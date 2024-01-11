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
import { SpecialtyService } from './specialty.service';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { JwtGuard, RolesGuard } from '@/auth/guards';
import { Roles } from '@/auth/decorator';
import { Role } from '@/user/roles';

@Controller('specialty')
@UseGuards(JwtGuard, RolesGuard)

export class SpecialtyController {
	constructor(private readonly specialtyService: SpecialtyService) {}

	@Post()
	@Roles([Role.ADMIN])
	create(@Body() createSpecialtyDto: CreateSpecialtyDto) {
		return this.specialtyService.create(createSpecialtyDto);
	}

	@Get()
	@Roles([Role.ADMIN])
	findAll() {
		return this.specialtyService.findAll();
	}

	@Get(':id')
	@Roles([Role.ADMIN])
	findOne(@Param('id') id: string) {
		return this.specialtyService.findOne(+id);
	}

	@Patch(':id')
	@Roles([Role.ADMIN])
	update(
		@Param('id') id: string,
		@Body() updateSpecialtyDto: UpdateSpecialtyDto,
	) {
		return this.specialtyService.update(+id, updateSpecialtyDto);
	}

	@Delete(':id')
	@Roles([Role.ADMIN])
	remove(@Param('id') id: string) {
		return this.specialtyService.remove(+id);
	}
}

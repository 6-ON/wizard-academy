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
import { RolesGuard } from '@/auth/guards/role.guard';
import { Roles } from '@/auth/decorator/role-decorator';
import { Role } from '@/user/roles';

@Controller('university')
@UseGuards(JwtGuard, RolesGuard)
export class UniversityController {
	constructor(private readonly universityService: UniversityService) {}

	@Post()
	@Roles([Role.ADMIN])
	create(@Body() createUniversityDto: CreateUniversityDto) {
		return this.universityService.create(createUniversityDto);
	}

	@Get()
	@Roles([Role.ADMIN])
	findAll() {
		return this.universityService.findAll();
	}

	@Get(':id')
	@Roles([Role.ADMIN])
	findOne(@Param('id') id: string) {
		return this.universityService.findOne(+id);
	}

	@Patch(':id')
	@Roles([Role.ADMIN , Role.DEAN])
	@UseGuards(UniversityOwnerGuard)
	update(
		@Param('id') id: string,
		@Body() updateUniversityDto: UpdateUniversityDto,
	) {
		return this.universityService.update(+id, updateUniversityDto);
	}

	@Delete(':id')
	@Roles([Role.ADMIN])
	remove(@Param('id') id: string) {
		return this.universityService.remove(+id);
	}
}

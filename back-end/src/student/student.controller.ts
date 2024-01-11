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
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { JwtGuard, RolesGuard } from '@/auth/guards';
import { Roles } from '@/auth/decorator';
import { Role } from '@/user/roles';

@Controller('student')
@UseGuards(JwtGuard, RolesGuard)
export class StudentController {
	constructor(private readonly studentService: StudentService) {}

	@Post()
	@Roles([Role.DEAN])
	create(@Body() createStudentDto: CreateStudentDto) {
		return this.studentService.create(createStudentDto);
	}

	@Get()
	@Roles([Role.DEAN])
	findAll() {
		return this.studentService.findAll();
	}

	@Get(':id')
	@Roles([Role.DEAN])
	findOne(@Param('id') id: string) {
		return this.studentService.findOne(+id);
	}

	@Patch(':id')
	@Roles([Role.DEAN])
	update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
		return this.studentService.update(+id, updateStudentDto);
	}

	@Delete(':id')
	@Roles([Role.DEAN])
	remove(@Param('id') id: string) {
		return this.studentService.remove(+id);
	}
}

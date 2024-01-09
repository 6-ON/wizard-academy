import { CreateUserDto } from '@/user/dto/create-user.dto';
import { Type } from 'class-transformer';
import {
	IsDateString,
	IsNotEmpty,
	IsNumber,
	ValidateNested,
} from 'class-validator';

export class CreateStudentDto {
	@Type(() => CreateUserDto)
	@ValidateNested()
	@IsNotEmpty()
	user: CreateUserDto;
	@IsNumber()
	age: number;
	@IsDateString()
	YearOfRegistration: string;
	@IsNotEmpty()
	@IsNumber()
	universityId: number;
}

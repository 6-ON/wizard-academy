import { CreateUserDto } from '@/user/dto/create-user.dto';
import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';

export class CreateDeanDto {
	@Type(() => CreateUserDto)
	@ValidateNested()
	@IsNotEmpty()
	user: CreateUserDto;
}

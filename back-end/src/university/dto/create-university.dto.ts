import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUniversityDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	adress: string;

	@IsNotEmpty()
	@IsNumber()
	deanId: number;
}

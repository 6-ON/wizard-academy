import { IsNotEmpty, IsString } from "class-validator";
export class CreateSalleDto {
    @IsNotEmpty()
    @IsString()
    number: number;
    @IsNotEmpty()
    @IsString()
    ability: string;
}

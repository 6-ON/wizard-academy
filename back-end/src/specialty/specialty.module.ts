import { Module } from '@nestjs/common';
import { SpecialtyService } from './specialty.service';
import { SpecialtyController } from './specialty.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specialty } from './entities/specialty.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Specialty])],
	controllers: [SpecialtyController],
	providers: [SpecialtyService],
	exports: [SpecialtyService],
})
export class SpecialtyModule {}

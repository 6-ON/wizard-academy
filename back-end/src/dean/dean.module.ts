import { Module } from '@nestjs/common';
import { DeanService } from './dean.service';
import { DeanController } from './dean.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dean } from './entities/dean.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Dean])],
	controllers: [DeanController],
	providers: [DeanService],
	exports: [DeanService],
})
export class DeanModule {}

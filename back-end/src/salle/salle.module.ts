import { Module } from '@nestjs/common';
import { SalleService } from './salle.service';
import { SalleController } from './salle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Salle } from './entities/salle.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Salle])],
	controllers: [SalleController],
	providers: [SalleService],
})
export class SalleModule {}

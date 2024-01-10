import { Test, TestingModule } from '@nestjs/testing';
import { SalleService } from './salle.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Salle } from './entities/salle.entity';
import { UpdateSalleDto } from './dto/update-salle.dto';


describe('SalleService', () => {
  let service: SalleService;
  let salle: Salle;

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				TypeOrmModule.forRoot({
					type: 'postgres',
					host: 'localhost',
					port: 5432,
					username: 'postgres',
					password: 'root',
					database: 'wizard_testing',
					entities: ['src/**/*.entity{.ts,.js}'],
					synchronize: true,
					dropSchema: true,
				}),
				TypeOrmModule.forFeature([Salle]),
			],
			providers: [SalleService],
		}).compile();

		service = module.get<SalleService>(SalleService);
	});

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add salle', async () => {
		salle = await service.create({
			number: 134,
			capacity: 'physique',
		});
		expect(salle).toBeInstanceOf(Salle);
	});

  it('should find all salles', async () => {
    const salles = await service.findAll();
    expect(salles).toBeInstanceOf(Array);
    expect(salles).toHaveLength(1);
    expect(salles.find((s) => s.id === salle.id)).toEqual(salle);
  });

  it('should find one salle', async () => {
    const foundSalle = await service.findOne(salle.id);
    expect(foundSalle).toBeInstanceOf(Salle);
    expect(foundSalle).toEqual(salle);
  });
  
  it('should update salle', async () => {
    const payload: UpdateSalleDto = {
      capacity: 'new capacity',
    };
    salle = await service.update(salle.id, payload);
    expect(salle).toBeInstanceOf(Salle);
    expect(salle.capacity).toEqual(payload.capacity);
  });

  it('should delete salle', async () => {
    const deletedSalle = await service.remove(salle.id);
    expect(deletedSalle).toBeInstanceOf(Salle);
    expect(deletedSalle).toEqual(salle);
  });
  
});

import { Test, TestingModule } from '@nestjs/testing';
import { DeanController } from './dean.controller';
import { DeanService } from './dean.service';

describe('DeanController', () => {
	let controller: DeanController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [DeanController],
			providers: [DeanService],
		}).compile();

		controller = module.get<DeanController>(DeanController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});

import { Test, TestingModule } from '@nestjs/testing';
import { PmpController } from './pmp.controller';
import { PmpService } from '../services/pmp.service';

describe('PmpController', () => {
  let controller: PmpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PmpController],
      providers: [PmpService],
    }).compile();

    controller = module.get<PmpController>(PmpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

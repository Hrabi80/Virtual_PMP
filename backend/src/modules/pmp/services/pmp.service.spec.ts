import { Test, TestingModule } from '@nestjs/testing';
import { PmpService } from './pmp.service';

describe('PmpService', () => {
  let service: PmpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PmpService],
    }).compile();

    service = module.get<PmpService>(PmpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

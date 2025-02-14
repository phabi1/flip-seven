import { Test, TestingModule } from '@nestjs/testing';
import { ConnectionManager } from './connection-manager';

describe('ConnectionManager', () => {
  let provider: ConnectionManager;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConnectionManager],
    }).compile();

    provider = module.get<ConnectionManager>(ConnectionManager);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});

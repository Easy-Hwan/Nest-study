import { Test, TestingModule } from '@nestjs/testing';
import { PodcastService } from './podcasts.service';

describe('PodcastService', () => {
  let service: PodcastService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PodcastService],
    }).compile();

    service = module.get<PodcastService>(PodcastService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

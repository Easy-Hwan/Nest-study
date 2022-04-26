import { Module } from '@nestjs/common';
import { PodcastController } from './podcasts/podcasts.controller';
import { PodcastService } from './podcasts/podcasts.service';

@Module({
  imports: [],
  controllers: [PodcastController],
  providers: [PodcastService],
})
export class AppModule {}

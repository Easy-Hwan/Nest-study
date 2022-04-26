import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';
import { PodcastService } from './podcasts.service';

@Controller('podcasts')
export class PodcastController {
  constructor(readonly podcastService: PodcastService) {}
  // GET /podcasts
  @Get()
  getAll(): Podcast[] {
    return this.podcastService.getAll();
  }
  // POST /podcasts
  @Post()
  insertOne(@Body() podcastData) {
    this.podcastService.insertOne(podcastData);
  }
  // GET /podcasts/:id
  @Get(':id')
  getOne(@Param('id') podcastId: string): Podcast {
    return this.podcastService.getOne(podcastId);
  }
  // PATCH /podcasts/:id
  @Patch(':id')
  updateOne(@Param('id') podcastId: string, @Body() podcastData) {
    this.podcastService.updateOne(podcastId, podcastData);
  }
  // DELETE /podcasts/:id
  @Delete(':id')
  deleteOne(@Param('id') podcastId: string) {
    this.podcastService.deleteOne(podcastId);
  }
  // GET /podcasts/:id/episodes
  @Get('/:id/episodes')
  getEpisode(@Param('id') podcastId: string): Episode[] {
    return this.podcastService.getEpisode(podcastId);
  }
  // POST /podcasts/:id/episodes
  @Post('/:id/episodes')
  insertOneEpisode(@Body() episodeData, @Param('id') podcastId: string) {
    this.podcastService.insertOneEpisode(podcastId, episodeData);
  }
  // PATCH /podcasts/:id/episodes/:episodeId
  @Patch('/:id/episodes/:episodeId')
  updateOenEpisode(
    @Param('id') podcastId: string,
    @Param('episodeId') episodeId: string,
    @Body() episodeData,
  ) {
    this.podcastService.updateOneEpisode(podcastId, episodeId, episodeData);
  }
  // DELETE /podcasts/:id/episodes/:episodeId
  @Delete('/:id/episodes/:episodeId')
  deleteOenEpisode(
    @Param('id') podcastId: string,
    @Param('episodeId') episodeId: string,
  ) {
    this.podcastService.deleteOneEpisode(podcastId, episodeId);
  }
}

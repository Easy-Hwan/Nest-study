import { Injectable, NotFoundException } from '@nestjs/common';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';

@Injectable()
export class PodcastService {
  // 가상 Data base
  private podcasts: Podcast[] = [];

  getAll(): Podcast[] {
    return this.podcasts;
  }

  insertOne(podcastInsertData) {
    const currentId = this.podcasts.length + 1;
    this.podcasts.push({
      id: currentId,
      ...podcastInsertData,
      episodes: [],
    });
    this.getOne(currentId.toString());
  }

  getOne(podcastId: string): Podcast {
    const findPotcast = this.podcasts.find(
      (podcast) => podcast.id === +podcastId,
    );
    if (!findPotcast) {
      throw new NotFoundException(`Podcast with ID ${podcastId} not found.`);
    }
    return findPotcast;
  }

  updateOne(podcastId: string, podcastUpdateData) {
    const afterData = this.getOne(podcastId);
    this.deleteOne(podcastId);
    this.podcasts.push({ ...afterData, ...podcastUpdateData });
  }

  deleteOne(podcastId: string) {
    this.podcasts = this.podcasts.filter(
      (podcast) => podcast.id !== +podcastId,
    );
  }

  getEpisode(podcastId: string): Episode[] {
    const findPodcast = this.getOne(podcastId);
    return findPodcast.episodes;
  }

  insertOneEpisode(podcastId: string, episodeData) {
    const findPodcast = this.getOne(podcastId);
    findPodcast.episodes.push({
      id: findPodcast.episodes.length + 1,
      ...episodeData,
    });
  }

  deleteOneEpisode(podcastId: string, episodeId: string) {
    const deleteTargetPodcastData = this.getOne(podcastId);
    deleteTargetPodcastData.episodes = deleteTargetPodcastData.episodes.filter(
      (episode) => episode.id !== +episodeId,
    );
    this.updateOne(podcastId, deleteTargetPodcastData);
  }

  updateOneEpisode(podcastId: string, episodeId: string, episodeData) {
    this.deleteOneEpisode(podcastId, episodeId);
    episodeData.id = +episodeId;
    this.insertOneEpisode(podcastId, episodeData);
  }
}

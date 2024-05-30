import { Injectable } from '@nestjs/common'
import { PodcastService } from '../podcast/podcast.service'
import { Episode, EpisodeDocument } from './schema/episode.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { IEpisode } from './interface/episode.interface'

@Injectable()
export class EpisodeService {
  constructor(
    @InjectModel(Episode.name) private podcastModel: Model<EpisodeDocument>,
    private readonly podcastService: PodcastService,
  ) {}
  create() {
    return 'This action adds a new episode'
  }

  async addEpisode(dto, user, url, id, episodeId) {
    const firstEpisode: IEpisode = {
      _id: episodeId,
      title: dto.episodeTitle,
      description: dto.episodeDescription,
      audioUrl: url,
      totalLike: 0,
    }

    return await this.podcastService.findOneAndUpdate({ _id: id }, { $push: { episodes: firstEpisode } }, { new: true })
  }

  async updateEpisode(episodeId, user, podcastId, url) {
    return await this.podcastService.findOneAndUpdate({ owner: user, 'episodes._id': episodeId }, { $set: { 'episodes.$.audioUrl': url } })
  }

  async updateDataEpisode(episodeId, podcastId, user, updateEpisodeDto) {
    console.log(user)
    return await this.podcastService.findOneAndUpdate(
      { _id: podcastId, owner: user, 'episodes._id': episodeId },
      { $set: { 'episodes.$.title': updateEpisodeDto.episodeTitle, 'episodes.$.description': updateEpisodeDto.episodeDescription } },
      { new: true },
    )
  }

  async deleteEpisode(user, episodeId, podcastId) {
    return await this.podcastService.findOneAndUpdate({ _id: podcastId, owner: user }, { $pull: { episodes: { _id: episodeId } } }, { new: true })
  }

  async locateEpisode(user, episodeId, newEpisodeId, newPodcastId, podcastId, url) {
    // return await this.podcastService.findOne(
    //   { _id: podcastId, owner: user, 'episodes._id': episodeId },
    // )

    const episode = await this.podcastModel.findOne({ _id: podcastId, 'episodes._id': episodeId }, { 'episodes.$': 1 }).exec()

    console.log('episode', episode)

    return await this.podcastService.moveEpisodeBetweenPodcasts(podcastId, newPodcastId, episodeId, newEpisodeId, user)
  }
}

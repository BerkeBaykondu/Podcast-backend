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
    const podcast = await this.podcastService.findOne({ _id: id })
    const firstEpisode: IEpisode = {
      _id: episodeId,
      title: dto.episodeTitle,
      description: dto.episodeDescription,
      imageUrl: podcast!.imageUrl, // bu satır yüzünden ekstra sorgu yapıyorum amk!!
      audioUrl: url,
      totalLike: 0,
    }

    return await this.podcastService.findOneAndUpdate({ _id: id }, { $push: { episodes: firstEpisode } }, { new: true })
  }

  async deleteEpisode(user, episodeId, podcastId) {
    return await this.podcastService.findOneAndUpdate({ _id: podcastId }, { $pull: { episodes: { _id: episodeId } } }, { new: true })
  }

  findAll() {
    return `This action returns all episode`
  }

  findOne(id: number) {
    return `This action returns a #${id} episode`
  }

  update(id: number) {
    return `This action updates a #${id} episode`
  }

  remove(id: number) {
    return `This action removes a #${id} episode`
  }
}

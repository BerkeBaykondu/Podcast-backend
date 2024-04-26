import { Injectable } from '@nestjs/common'
import { IPodcast } from './interface/podcast.interface'
import { UpdatePodcastDto } from './interface/update-podcast.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Podcast, PodcastDocument } from './schema/podcast.schema'
import { Model } from 'mongoose'
import { AwsService } from 'src/aws/aws.service'
import { UserService } from 'src/user/user.service'

@Injectable()
export class PodcastService {
  constructor(
    @InjectModel(Podcast.name) private podcastModel: Model<PodcastDocument>,
    private readonly userService: UserService,
  ) {}
  async create(createPodcastDto: IPodcast.IUploadPodcast, user): Promise<any> {
    const podcast = await this.podcastModel.create(createPodcastDto)
    return await this.userService.findOneAndUpdate({ user_id: user }, { $push: { createdPodcastList: podcast!._id } }, { new: true })
  }

  async fetchTrtData() {
    const trtData = await fetch('https://www.trtdinle.com/api/detail?path=/genre/aile-ve-cocuk').then((response) => {
      return response.json()
    })
    const promises = trtData.popular.map(async (item) => {
      const response = await fetch(`https://www.trtdinle.com/api/detail?path=${item.shareUrl}`)
      const data = await response.json()
      return data.items[0]
    })

    return Promise.all(promises).then((results) => {
      results.forEach((audio) => {
        console.log(audio)
      })
    })
  }

  findAll() {
    return `This action returns all podcast`
  }

  findOne(id: number) {
    return `This action returns a #${id} podcast`
  }

  update(id: number, updatePodcastDto: UpdatePodcastDto) {
    return `This action updates a #${id} podcast`
  }

  remove(id: number) {
    return `This action removes a #${id} podcast`
  }
}

import { Injectable } from '@nestjs/common'
import { IPodcast } from './interface/podcast.interface'
import { UpdatePodcastDto } from './interface/update-podcast.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Podcast, PodcastDocument } from './schema/podcast.schema'
import { Model } from 'mongoose'
import { AwsService } from 'src/aws/aws.service'
import { UserService } from 'src/user/user.service'
import sharp from 'sharp'
import axios from 'axios'

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

  async delete(podcastId: any, user) {
    await this.podcastModel.deleteOne({ _id: podcastId })
    return await this.userService.findOneAndUpdate({ user_id: user }, { $pull: { createdPocastList: podcastId } }, { new: true })
  }

  async fetchTrtData() {
    // const trtFetchLinks = [
    //   'https://www.trtdinle.com/api/detail?path=/genre/din-ve-yasam',
    //   'https://www.trtdinle.com/api/detail?path=/genre/aile-ve-cocuk',
    //   'https://www.trtdinle.com/api/detail?path=/genre/haber',
    //   'https://www.trtdinle.com/api/detail?path=/genre/tarih-8687',
    //   'https://www.trtdinle.com/api/detail?path=/genre/soylesi',
    //   'https://www.trtdinle.com/api/detail?path=/genre/biyografi',
    //   'https://www.trtdinle.com/api/detail?path=/genre/sanat',
    //   'https://www.trtdinle.com/api/detail?path=/genre/edebiyat',
    //   'https://www.trtdinle.com/api/detail?path=/genre/muzik-7134',
    //   'https://www.trtdinle.com/api/detail?path=/genre/genel-kultur',
    //   'https://www.trtdinle.com/api/detail?path=/genre/teknoloji',
    //   'https://www.trtdinle.com/api/detail?path=/genre/spor',
    // ]
    const trtData = await fetch('https://www.trtdinle.com/api/detail?path=/genre/podcast').then((trtData) => {
      return trtData.json()
    })

    // delete unnecessary output
    delete trtData.description
    delete trtData.featuredImage
    delete trtData.isLiked
    delete trtData.isFavorite
    delete trtData.score
    delete trtData.popularity
    delete trtData.popular

    trtData.imageUrl = await this.modifyPodcastImage(trtData.imageUrl, 300, 300)
    trtData.homepageImage = await this.modifyPodcastImage(trtData.homepageImage, 300, 300)

    await Promise.all(
      trtData.sets.map(async (set, index) => {
        delete set.featuredImage
        delete set.layout
        delete set.index
        return {
          ...set,
          contents: await Promise.all(
            set.contents.map(async (content) => {
              delete content.featuredImage

              if (index == 0) {
                content.imageUrl = await this.modifyPodcastImage(trtData.imageUrl, 400, 400)
                trtData.featuredPodcasts = set
              } else if (index == 1) {
                content.imageUrl = await this.modifyPodcastImage(trtData.imageUrl, 300, 300)
                trtData.podcastGenres = set
              } else {
                content.imageUrl = await this.modifyPodcastImage(trtData.imageUrl, 200, 200)
              }
              return content
            }),
          ),
        }
      }),
    )
    trtData.sets = trtData.sets.slice(3)

    return trtData
  }

  async modifyPodcastImage(imageUrl, width, height) {
    return axios
      .get(imageUrl, { responseType: 'arraybuffer' })
      .then((response) => sharp(response.data).resize({ width: width, height: height }).webp().toBuffer())
      .then((resizedImage) => {
        const base64 = resizedImage.toString('base64')
        return `data:image/webp;base64,${base64}`
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

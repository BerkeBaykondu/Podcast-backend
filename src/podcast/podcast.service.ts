import { Injectable } from '@nestjs/common'
import { IPodcast } from './interface/podcast.interface'
import { UpdatePodcastDto } from './interface/update-podcast.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Podcast, PodcastDocument } from './schema/podcast.schema'
import { Model } from 'mongoose'
import { UserService } from 'src/user/user.service'
import sharp from 'sharp'
import { ObjectId } from 'mongodb'
import { IEpisode } from '../episode/interface/episode.interface'

@Injectable()
export class PodcastService {
  constructor(
    @InjectModel(Podcast.name) private podcastModel: Model<PodcastDocument>,
    private readonly userService: UserService,
  ) {}
  async create(createPodcastDto: IPodcast.ICreatePodcastWithFirstEpisode, user, urls): Promise<any> {
    const firstEpisode: IEpisode = {
      name: createPodcastDto.episodeName,
      description: createPodcastDto.episodeDescription,
      imageUrl: urls[0],
      audioUrl: urls[1],
      totalLike: 0,
    }

    const newPodcast: Podcast = {
      name: createPodcastDto.podcastName,
      category: createPodcastDto.podcastCategory,
      description: createPodcastDto.podcastDescription,
      episodes: [firstEpisode],
      imageUrl: urls[0],
      totalLike: 0,
      owner: user,
    }
    const podcast = await this.podcastModel.create(newPodcast)
    return await this.userService.findOneAndUpdate({ user_id: user }, { $push: { createdPodcastList: podcast!._id } }, { new: true })
  }
  async createEmptyPodcast(createEmptyPodcastDto, user, url) {
    const newPodcast: Podcast = {
      name: createEmptyPodcastDto.name,
      category: createEmptyPodcastDto.category,
      description: createEmptyPodcastDto.description,
      episodes: [],
      imageUrl: url,
      totalLike: 0,
      owner: user,
    }
    console.log(newPodcast)
    const podcast = await this.podcastModel.create(newPodcast)
    return await this.userService.findOneAndUpdate({ user_id: user }, { $push: { createdPodcastList: podcast!._id } }, { new: true })
  }

  async delete(podcastId: any, user): Promise<any> {
    const podcastObjectId = ObjectId.createFromHexString(podcastId)
    await this.podcastModel.deleteOne({ _id: podcastObjectId })
    const updatedUser = await this.userService.findOneAndUpdate({ user_id: user }, { $pull: { createdPodcastList: podcastObjectId } }, { new: true })
    return updatedUser
  }

  async findAll() {
    return await this.podcastModel.find()
  }

  async findMainPage() {
    return await this.podcastModel.find().select('-episodes')
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
    const response = await fetch(imageUrl)
    const buffer = await response.arrayBuffer()
    const resizedImage = await sharp(Buffer.from(buffer)).resize({ width: width, height: height }).webp().toBuffer()
    const base64 = resizedImage.toString('base64')
    return `data:image/webp;base64,${base64}`
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

import { Injectable } from '@nestjs/common'
import { IPodcast } from './interface/podcast.interface'
import { UpdatePodcastDto } from './interface/update-podcast.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Podcast, PodcastDocument } from './schema/podcast.schema'
import { Model } from 'mongoose'
import { AwsService } from 'src/aws/aws.service'
import { UserService } from 'src/user/user.service'
import * as sharp from 'sharp'
import axios from 'axios'
// import { createCanvas, loadImage } from 'canvas'
// import * as fs from 'fs'
// import * as path from 'path'    silinecek kütüphaneler!!!!

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
    const trtFetchLinks = [
      'https://www.trtdinle.com/api/detail?path=/genre/din-ve-yasam',
      'https://www.trtdinle.com/api/detail?path=/genre/aile-ve-cocuk',
      'https://www.trtdinle.com/api/detail?path=/genre/haber',
      'https://www.trtdinle.com/api/detail?path=/genre/tarih-8687',
      'https://www.trtdinle.com/api/detail?path=/genre/soylesi',
      'https://www.trtdinle.com/api/detail?path=/genre/biyografi',
      'https://www.trtdinle.com/api/detail?path=/genre/sanat',
      'https://www.trtdinle.com/api/detail?path=/genre/edebiyat',
      'https://www.trtdinle.com/api/detail?path=/genre/muzik-7134',
      'https://www.trtdinle.com/api/detail?path=/genre/genel-kultur',
      'https://www.trtdinle.com/api/detail?path=/genre/teknoloji',
      'https://www.trtdinle.com/api/detail?path=/genre/spor',
    ]
    const trtData = await fetch('https://www.trtdinle.com/api/detail?path=/genre/podcast').then((trtData) => {
      return trtData.json()
    })
    const promises = trtData.popular.map(async (item, index) => {
      const response = await fetch(`https://www.trtdinle.com/api/detail?path=${item.shareUrl}`)
      const data = await response.json()
      trtData.popular[index].audio = []
      data.items.forEach((item) => {
        trtData.popular[index].audio.push(item.audio)
      })
      trtData.popular[index].imageUrl = await this.modifyPodcastImage(trtData.popular[index].imageUrl)
      return trtData.popular[index]
    })

    return Promise.all(promises).then((results) => {
      return results
    })
  }

  async modifyPodcastImage(imageUrl) {
    return axios
      .get(imageUrl, { responseType: 'arraybuffer' })
      .then((response) => sharp(response.data).resize({ width: 200, height: 200 }).webp().toBuffer())
      .then((resizedImage) => {
        const base64 = resizedImage.toString('base64')
        return `data:image/webp;base64,${base64}`
      })
  }

  // async processImage(base64Data: string): Promise<any> {
  //   // Veriyi temizle
  //   const base64 = base64Data.split(';base64,').pop()
  //   const buffer = Buffer.from(base64!, 'base64')

  //   const image = await loadImage(buffer)
  //   const canvas = createCanvas(image.width, image.height)
  //   const context = canvas.getContext('2d')

  //   // Resmi çiz
  //   context.drawImage(image, 0, 0)

  //   // Resmi görüntülemek için
  //   const imageData = canvas.toDataURL('image/png')
  //   console.log(imageData)

  //   return imageData
  // }

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

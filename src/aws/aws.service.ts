import {
  DeleteObjectCommand,
  DeleteObjectsCommand,
  GetObjectCommand,
  ListObjectsCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { Injectable } from '@nestjs/common'
import { EpisodeService } from '../episode/episode.service'
import { PodcastService } from '../podcast/podcast.service'
import { ObjectId } from 'mongodb'

@Injectable()
export class AwsService {
  private s3: S3Client

  constructor(
    private readonly podcastService: PodcastService,
    private readonly episodeService: EpisodeService,
  ) {
    this.s3 = new S3Client({
      region: process.env.BUCKETREGION!,
      credentials: {
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      },
    })
  }
  async createPodcastWithFirstEpisode(files, createPodcastDto, user): Promise<any> {
    let webpAndmp3Urls: string[] = []
    const id = new ObjectId().toHexString()
    const episodeId = new ObjectId().toHexString()
    const uploadAndGetUrlPromises = files.map(async (file, index) => {
      const keyPrefix = index === 0 ? `${user}/${id}/${id}` : `${user}/${id}/${episodeId}`
      await this.s3.send(
        new PutObjectCommand({
          Bucket: process.env.BUCKETNAME,
          Key: keyPrefix,
          Body: file.buffer,
        }),
      )
      const url = await getSignedUrl(
        this.s3,
        new GetObjectCommand({
          Bucket: process.env.BUCKETNAME,
          Key: keyPrefix,
        }),
        { expiresIn: 360000 },
      )
      webpAndmp3Urls.push(url)
      return url
    })

    await Promise.all(uploadAndGetUrlPromises)

    return await this.podcastService.createPodcastWithFirstEpisode(createPodcastDto, user, webpAndmp3Urls, id, episodeId)
  }

  async createEmptyPodcast(file, createEmptyPodcastDto, user) {
    const id = new ObjectId().toHexString()

    await this.s3.send(
      new PutObjectCommand({
        Bucket: process.env.BUCKETNAME,
        Key: `${user}/${id}/${id}`,
        Body: file.buffer,
      }),
    )

    const url = await getSignedUrl(
      this.s3,
      new GetObjectCommand({
        Bucket: process.env.BUCKETNAME,
        Key: `${user}/${id}/${id}`,
      }),
      { expiresIn: 360000 },
    )

    return await this.podcastService.createEmptyPodcast(createEmptyPodcastDto, user, url, id)
  }

  async addEpisode(file, dto, user, id) {
    const episodeId = new ObjectId().toHexString()
    await this.s3.send(
      new PutObjectCommand({
        Bucket: process.env.BUCKETNAME,
        Key: `${user}/${id}/${episodeId}`,
        Body: file.buffer,
      }),
    )
    const url = await getSignedUrl(
      this.s3,
      new GetObjectCommand({
        Bucket: process.env.BUCKETNAME,
        Key: `${user}/${id}/${episodeId}`,
      }),
      { expiresIn: 360000 },
    )

    return await this.episodeService.addEpisode(dto, user, url, id, episodeId)
  }

  async deletePodcast(user, podcastId): Promise<void> {
    // list files in specific folder

    const filesInFolder = await this.s3.send(
      new ListObjectsV2Command({
        Bucket: process.env.BUCKETNAME,
        Prefix: `${user}/${podcastId}/`,
      }),
    )

    // // create delete file promises ( files in that folder)
    const deletePromises = filesInFolder.Contents!.map((object) => {
      return this.s3.send(
        new DeleteObjectCommand({
          Bucket: process.env.BUCKETNAME,
          Key: object.Key!,
        }),
      )
    })
    // // deleting process
    await Promise.all(deletePromises)

    // delete the folder
    await this.s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.BUCKETNAME,
        Key: `${user}/${podcastId}`,
      }),
    )
  }

  async deleteEpisode(user, episodeId, podcastId) {
    await this.s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.BUCKETNAME,
        Key: `${user}/${podcastId}/${episodeId}`,
      }),
    )
    return await this.episodeService.deleteEpisode(user, episodeId, podcastId)
  }

  async updateEpisodeFile(file, user, episodeId, podcastId) {
    await this.s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.BUCKETNAME,
        Key: `${user}/${podcastId}/${episodeId}`,
      }),
    )
    await this.s3.send(
      new PutObjectCommand({
        Bucket: process.env.BUCKETNAME,
        Key: `${user}/${podcastId}/${episodeId}`,
        Body: file.buffer,
      }),
    )

    const url = await getSignedUrl(
      this.s3,
      new GetObjectCommand({
        Bucket: process.env.BUCKETNAME,
        Key: `${user}/${podcastId}/${episodeId}`,
      }),
      { expiresIn: 360000 },
    )

    return this.episodeService.updateEpisode(episodeId, user, podcastId, url)
  }

  async updatePodcastFile(file, userId, episodeId, podcastId) {}
}

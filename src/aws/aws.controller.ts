import { Body, Controller, Delete, Get, Param, ParseFilePipe, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common'
import { AwsService } from './aws.service'
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express'
import { TypedBody, TypedRoute } from '@nestia/core'
import { IPodcast } from 'src/podcast/interface/podcast.interface'
import { PodcastService } from 'src/podcast/podcast.service'

@Controller('aws')
export class AwsController {
  constructor(
    private readonly awsService: AwsService,
    private readonly podcastService: PodcastService,
  ) {}
  @TypedRoute.Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // new MaxFileSizeValidator({ maxSize: 1000 }),
          // new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() createPodcastDto: IPodcast.IUploadPodcast,
    @Req() req,
  ) {
    req.user = '313131313'
    return await Promise.allSettled([this.awsService.upload(file.originalname, file.buffer), this.podcastService.create(createPodcastDto, req.user)])
  }
  @Delete()
  async deleteFile(fileName: string, folderName: string, @Param('podcastId') podcastId, @Req() req) {
    req.user = '313131313'
    await Promise.allSettled([this.awsService.delete(fileName, folderName), this.podcastService.delete(podcastId, req.user)])
  }
}

import { Body, Controller, Delete, Get, Param, ParseFilePipe, Post, Req, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common'
import { AwsService } from './aws.service'
import { AnyFilesInterceptor, FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { TypedBody, TypedRoute } from '@nestia/core'
import { IPodcast } from 'src/podcast/interface/podcast.interface'
import { PodcastService } from 'src/podcast/podcast.service'
import { FileTypePipe } from '../core/pipe/upload.pipe'

@Controller('aws')
export class AwsController {
  constructor(
    private readonly awsService: AwsService,
    private readonly podcastService: PodcastService,
  ) {}
  @Post()
  @UseInterceptors(FilesInterceptor('file', 2))
  async uploadFile(
    @UploadedFiles(new FileTypePipe())
    files: Array<Express.Multer.File>,
    @Body()
    createPodcastDto: IPodcast.IUploadPodcast,
    @Req() req,
  ) {
    req.user = '313131313'
    return await this.awsService.upload(files, createPodcastDto, req.user)
  }
  @Delete(':podcastId')
  async deleteFile(@Body() deletePodcastDto: IPodcast.IDeletePodcast, @Param('podcastId') podcastId, @Req() req) {
    req.user = '313131313'
    await Promise.allSettled([
      this.awsService.delete(deletePodcastDto.fileName, deletePodcastDto.folderName),
      this.podcastService.delete(podcastId, req.user),
    ])
  }
}

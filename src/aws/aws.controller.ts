import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common'
import { AwsService } from './aws.service'
import { AnyFilesInterceptor, FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { TypedBody, TypedRoute } from '@nestia/core'
import { IPodcast } from 'src/podcast/interface/podcast.interface'
import { PodcastService } from 'src/podcast/podcast.service'
import { FileTypePipe } from '../core/pipe/upload.pipe'
import { IEpisode } from '../episode/interface/episode.interface'

@Controller('aws')
export class AwsController {
  constructor(
    private readonly awsService: AwsService,
    private readonly podcastService: PodcastService,
  ) {}
  @Post('withEpisode')
  @UseInterceptors(FilesInterceptor('file', 2))
  async createPodcastWithFirstEpisode(
    @UploadedFiles(new FileTypePipe())
    files: Array<Express.Multer.File>,
    @Body()
    createPodcastDto: IPodcast.ICreatePodcastWithFirstEpisode,
    @Req() req,
  ) {
    req.user = '313131313'
    return await this.awsService.createPodcastWithFirstEpisode(files, createPodcastDto, req.user)
  }

  @Post('emptyPodcast')
  @UseInterceptors(FileInterceptor('file'))
  async createEmptyPodcast(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image/webp' })],
      }),
    )
    file: Express.Multer.File,
    @Body()
    createEmptyPodcastDto: IPodcast.IUploadPodcast,
    @Req() req,
  ) {
    req.user = '313131313'
    return await this.awsService.createEmptyPodcast(file, createEmptyPodcastDto, req.user)
  }

  @Post('addEpisode/:podcastId')
  @UseInterceptors(FileInterceptor('file'))
  async createEpisode(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'audio/mpeg' })],
      }),
    )
    file: Express.Multer.File,
    @Body()
    createEmptyPodcastDto: IEpisode.IAddEpisode,
    @Req() req,
    @Param('podcastId') podcastId,
  ) {
    req.user = '313131313'
    return await this.awsService.addEpisode(file, createEmptyPodcastDto, req.user, podcastId)
  }

  @Delete(':podcastId')
  async deleteFile(@Param('podcastId') podcastId, @Req() req) {
    req.user = '313131313'
    await Promise.allSettled([this.awsService.deletePodcast(req.user, podcastId), this.podcastService.deletePodcast(podcastId, req.user)])
  }
}

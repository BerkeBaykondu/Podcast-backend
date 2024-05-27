import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { AwsService } from './aws.service'
import { AnyFilesInterceptor, FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { TypedBody, TypedRoute } from '@nestia/core'
import { IPodcast } from 'src/podcast/interface/podcast.interface'
import { PodcastService } from 'src/podcast/podcast.service'
import { FileTypePipe } from '../core/pipe/upload.pipe'
import { IEpisode } from '../episode/interface/episode.interface'
import { AuthGuard } from 'src/core/guard/auth.guard'

@Controller('aws')
@UseGuards(AuthGuard)
export class AwsController {
  constructor(
    private readonly awsService: AwsService,
    private readonly podcastService: PodcastService,
  ) {}
  // @Post('withEpisode')
  // @UseInterceptors(FilesInterceptor('file', 2))
  // async createPodcastWithFirstEpisode(
  //   @UploadedFiles(new FileTypePipe())
  //   files: Array<Express.Multer.File>,
  //   @Body()
  //   createPodcastDto: IPodcast.ICreatePodcastWithFirstEpisode,
  //   @Req() req,
  // ) {
  //   return await this.awsService.createPodcastWithFirstEpisode(files, createPodcastDto, req.user)
  // }

  // @Post('emptyPodcast')
  // @UseInterceptors(FileInterceptor('file'))
  // async createEmptyPodcast(
  //   @UploadedFile()
  //   file: Express.Multer.File,
  //   @Body()
  //   createEmptyPodcastDto: IPodcast.IUploadPodcast,
  //   @Req() req,
  // ) {
  //   return await this.awsService.createEmptyPodcast(file, createEmptyPodcastDto, req.user)
  // }

  @Post('denemee')
  @UseInterceptors(FileInterceptor('file'))
  async deneme(
    @UploadedFile()
    file: any,
  ) {
    console.log('file=>>>>>', file)
    return file
  }

  // @Post('addEpisode/:podcastId')
  // @UseInterceptors(FileInterceptor('file'))
  // async createEpisode(
  //   @UploadedFile(
  //     new ParseFilePipe({
  //       validators: [new FileTypeValidator({ fileType: 'audio/mpeg' })],
  //     }),
  //   )
  //   file: Express.Multer.File,
  //   @Body()
  //   createEmptyPodcastDto: IEpisode.IAddEpisode,
  //   @Req() req,
  //   @Param('podcastId') podcastId,
  // ) {
  //   return await this.awsService.addEpisode(file, createEmptyPodcastDto, req.user, podcastId)
  // }

  // @Delete('deletePodcast/:podcastId')
  // async deleteFile(@Param('podcastId') podcastId, @Req() req) {
  //   return await Promise.allSettled([this.awsService.deletePodcast(req.user, podcastId), this.podcastService.deletePodcast(podcastId, req.user)])
  // }

  // @Delete('deleteEpisode/:podcastId/:episodeId')
  // async deleteEpisode(@Param('episodeId') episodeId, @Param('podcastId') podcastId, @Req() req) {
  //   return await this.awsService.deleteEpisode(req.user, episodeId, podcastId)
  // }

  // // Update File
  // @Patch('updateEpisode/:podcastId/:episodeId')
  // @UseInterceptors(FileInterceptor('file'))
  // async updateEpisode(
  //   @UploadedFile(
  //     new ParseFilePipe({
  //       validators: [new FileTypeValidator({ fileType: 'audio/mpeg' })],
  //     }),
  //   )
  //   file: Express.Multer.File,
  //   @Param('episodeId') episodeId,
  //   @Param('podcastId') podcastId,
  //   @Req() req,
  // ) {
  //   return await this.awsService.updateEpisodeFile(file, req.user, episodeId, podcastId)
  // }
}

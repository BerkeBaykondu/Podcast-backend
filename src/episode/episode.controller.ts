import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  FileTypeValidator,
  ParseFilePipe,
} from '@nestjs/common'
import { EpisodeService } from './episode.service'
import { IEpisode } from './interface/episode.interface'
import { AuthGuard } from 'src/core/guard/auth.guard'
import { FileInterceptor } from '@nestjs/platform-express'
import { AwsService } from 'src/aws/aws.service'

@Controller('episode')
@UseGuards(AuthGuard)
export class EpisodeController {
  constructor(
    private readonly episodeService: EpisodeService,
    private readonly awsService: AwsService,
  ) {}

  // update data
  @Patch('data/:podcastId/:episodeId')
  async updateEpisode(@Param('episodeId') episodeId, @Param('podcastId') podcastId, @Req() req, @Body() updateEpisodeDto: IEpisode.IUpdateEpisode) {
    return await this.episodeService.updateDataEpisode(episodeId, podcastId, req.user, updateEpisodeDto)
  }

  // Update File
  @Patch('file/:podcastId/:episodeId')
  @UseInterceptors(FileInterceptor('file'))
  async updateFileEpisode(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'audio/mpeg' })],
      }),
    )
    file: Express.Multer.File,
    @Param('episodeId') episodeId,
    @Param('podcastId') podcastId,
    @Req() req,
  ) {
    return await this.awsService.updateEpisodeFile(file, req.user, episodeId, podcastId)
  }

  // Post Episode
  @Post(':podcastId')
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
    return await this.awsService.addEpisode(file, createEmptyPodcastDto, req.user, podcastId)
  }

  // Delete Episode
  @Delete(':podcastId/:episodeId')
  async deleteEpisode(@Param('episodeId') episodeId, @Param('podcastId') podcastId, @Req() req) {
    return await this.awsService.deleteEpisode(req.user, episodeId, podcastId)
  }
}

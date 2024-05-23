import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Req, UseGuards } from '@nestjs/common'
import { PodcastService } from './podcast.service'

import { UpdatePodcastDto } from './interface/update-podcast.dto'
import { IPodcast } from './interface/podcast.interface'
import { TypedBody, TypedRoute } from '@nestia/core'
import { AuthGuard } from '../core/guard/auth.guard'

@Controller('podcast')
@UseGuards(AuthGuard)
export class PodcastController {
  constructor(private readonly podcastService: PodcastService) {}

  // fetch Trt Podcast
  @Get('fetchTrtPodcast')
  async fetchTrt() {
    return await this.podcastService.fetchTrtData()
  }

  // Bir kullanıcının bütün podcastleri

  @Get('withEpisode')
  findAll() {
    return this.podcastService.findAll()
  }
  @Get()
  findMainPage() {
    return this.podcastService.findMainPage()
  }

  // user podcast interactions
  @Post('like/:podcastId')
  likePodcast(@Param('podcastId') podcastId: string, @Req() req) {
    return this.podcastService.likePodcast(req.user, podcastId)
  }
  @Post('removeLike/:podcastId')
  removeLikedPodcast(@Param('podcastId') podcastId: string, @Req() req) {
    return this.podcastService.removeLikedPodcast(req.user, podcastId)
  }
  @Post('pin/:podcastId')
  pinPodcast(@Param('podcastId') podcastId: string, @Req() req) {
    return this.podcastService.pinPodcast(req.user, podcastId)
  }
  @Post('removePin/:podcastId')
  removePinnedPodcast(@Param('podcastId') podcastId: string, @Req() req) {
    return this.podcastService.removePinnedPodcast(req.user, podcastId)
  }
  @Post('archive/:pdocastId')
  archivePodcast(@Param('podcastId') podcastId: string, @Req() req) {
    return this.podcastService.archivePodcast(req.user, podcastId)
  }
  @Post('removeArchive/podcastId')
  removeArchivedPodcast(@Param('podcastId') podcastId: string, @Req() req) {
    return this.podcastService.removeArchivedPodcast(req.user, podcastId)
  }
}

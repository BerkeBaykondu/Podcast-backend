import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Req } from '@nestjs/common'
import { PodcastService } from './podcast.service'

import { UpdatePodcastDto } from './interface/update-podcast.dto'
import { IPodcast } from './interface/podcast.interface'
import { TypedBody, TypedRoute } from '@nestia/core'

@Controller('podcast')
export class PodcastController {
  constructor(private readonly podcastService: PodcastService) {}

  @Get('fetchTrtData')
  async fetchTrt() {
    return await this.podcastService.fetchTrtData()
  }

  @Get()
  findAll() {
    return this.podcastService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.podcastService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePodcastDto: UpdatePodcastDto) {
    return this.podcastService.update(+id, updatePodcastDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.podcastService.remove(+id)
  }
}

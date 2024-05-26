import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common'
import { EpisodeService } from './episode.service'
import { IEpisode } from './interface/episode.interface'
import { AuthGuard } from 'src/core/guard/auth.guard'

@Controller('episode')
@UseGuards(AuthGuard)
export class EpisodeController {
  constructor(private readonly episodeService: EpisodeService) {}

  @Patch('updateData/:podcastId/:episodeId')
  async updateEpisode(@Param('episodeId') episodeId, @Param('podcastId') podcastId, @Req() req, @Body() updateEpisodeDto: IEpisode.IUpdateEpisode) {
    return await this.episodeService.updateDataEpisode(episodeId, podcastId, req.user, updateEpisodeDto)
  }

  @Post()
  create() {
    return this.episodeService.create()
  }

  @Get()
  findAll() {
    return this.episodeService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.episodeService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.episodeService.update(+id)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.episodeService.remove(+id)
  }
}

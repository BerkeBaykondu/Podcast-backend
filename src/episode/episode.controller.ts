import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { EpisodeService } from './episode.service'

@Controller('episode')
export class EpisodeController {
  constructor(private readonly episodeService: EpisodeService) {}

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

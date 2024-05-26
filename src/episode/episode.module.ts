import { Module } from '@nestjs/common'
import { EpisodeService } from './episode.service'
import { EpisodeController } from './episode.controller'
import { PodcastService } from '../podcast/podcast.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Podcast, podcastSchema } from '../podcast/schema/podcast.schema'
import { User, userSchema } from '../user/schema/user.schema'
import { Episode, episodeSchema } from './schema/episode.schema'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Podcast.name, schema: podcastSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
    MongooseModule.forFeature([{ name: Episode.name, schema: episodeSchema }]),
  ],
  controllers: [EpisodeController],
  providers: [EpisodeService, PodcastService, UserService, JwtService],
})
export class EpisodeModule {}

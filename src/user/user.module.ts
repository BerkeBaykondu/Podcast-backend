import { Module, forwardRef } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { User, userSchema } from './schema/user.schema'
import { MongooseModule } from '@nestjs/mongoose'
import { PodcastService } from 'src/podcast/podcast.service'
import { Podcast, podcastSchema } from 'src/podcast/schema/podcast.schema'
import { Episode, episodeSchema } from 'src/episode/schema/episode.schema'
import { EpisodeService } from 'src/episode/episode.service'
import { PodcastModule } from 'src/podcast/podcast.module'
import { EpisodeModule } from 'src/episode/episode.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
    MongooseModule.forFeature([{ name: Podcast.name, schema: podcastSchema }]),
    MongooseModule.forFeature([{ name: Episode.name, schema: episodeSchema }]),
    forwardRef(() => PodcastModule),
    EpisodeModule,
  ],
  controllers: [UserController],
  providers: [UserService, PodcastService, EpisodeService],
})
export class UserModule {}

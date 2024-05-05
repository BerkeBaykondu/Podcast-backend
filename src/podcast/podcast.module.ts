import { Module } from '@nestjs/common'
import { PodcastService } from './podcast.service'
import { PodcastController } from './podcast.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Podcast, podcastSchema } from './schema/podcast.schema'
import { AwsService } from 'src/aws/aws.service'
import { UserService } from 'src/user/user.service'
import { User, userSchema } from 'src/user/schema/user.schema'
import { EpisodeService } from '../episode/episode.service'
import { Episode, episodeSchema } from '../episode/schema/episode.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Podcast.name, schema: podcastSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
    MongooseModule.forFeature([{ name: Episode.name, schema: episodeSchema }]),
  ],
  controllers: [PodcastController],
  providers: [PodcastService, AwsService, UserService, EpisodeService],
})
export class PodcastModule {}

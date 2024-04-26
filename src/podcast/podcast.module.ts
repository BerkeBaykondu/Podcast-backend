import { Module } from '@nestjs/common'
import { PodcastService } from './podcast.service'
import { PodcastController } from './podcast.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Podcast, podcastSchema } from './schema/podcast.schema'
import { AwsService } from 'src/aws/aws.service'
import { UserService } from 'src/user/user.service'
import { User, userSchema } from 'src/user/schema/user.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Podcast.name, schema: podcastSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
  ],
  controllers: [PodcastController],
  providers: [PodcastService, AwsService, UserService],
})
export class PodcastModule {}

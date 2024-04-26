import { Module } from '@nestjs/common'
import { AwsService } from './aws.service'
import { AwsController } from './aws.controller'
import { PodcastService } from 'src/podcast/podcast.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Podcast, podcastSchema } from 'src/podcast/schema/podcast.schema'
import { UserService } from 'src/user/user.service'
import { User, userSchema } from 'src/user/schema/user.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Podcast.name, schema: podcastSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
  ],
  controllers: [AwsController],
  providers: [AwsService, PodcastService, UserService],
})
export class AwsModule {}

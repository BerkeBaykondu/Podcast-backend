import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { User, userSchema } from './schema/user.schema'
import { MongooseModule } from '@nestjs/mongoose'
import { PodcastService } from 'src/podcast/podcast.service'
import { Podcast, podcastSchema } from 'src/podcast/schema/podcast.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
    MongooseModule.forFeature([{ name: Podcast.name, schema: podcastSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, PodcastService],
})
export class UserModule {}

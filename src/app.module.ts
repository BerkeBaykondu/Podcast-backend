import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { MongooseModule } from '@nestjs/mongoose'
import { PodcastModule } from './podcast/podcast.module'
import { AwsModule } from './aws/aws.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot('mongodb://localhost:27017/podcast'),
    PodcastModule,
    AwsModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

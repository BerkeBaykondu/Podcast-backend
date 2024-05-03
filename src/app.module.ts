import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { MongooseModule } from '@nestjs/mongoose'
import { PodcastModule } from './podcast/podcast.module'
import { AwsModule } from './aws/aws.module'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER } from '@nestjs/core'
import { AllExceptionsFilter } from './core/pipe/exception.filter'
import { EpisodeModule } from './episode/episode.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot('mongodb+srv://berke:x4UpWhhqx6z0uZ6q@cluster0.po5lgyi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    PodcastModule,
    AwsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    EpisodeModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}

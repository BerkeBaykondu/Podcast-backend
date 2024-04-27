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

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot('mongodb://localhost:27017/podcast'),
    PodcastModule,
    AwsModule,
    ConfigModule.forRoot({ isGlobal: true }),
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

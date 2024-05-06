import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'https://podcast-backend-six.vercel.app', // Allow only this origin
      credentials: true, // Allow credentials like cookies
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these HTTP methods
    },
  })
  await app.listen(3000)
}
bootstrap()

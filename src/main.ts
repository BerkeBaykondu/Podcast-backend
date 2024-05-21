import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import bodyParser from 'body-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'https://podcast-backend-six.vercel.app', // Allow only this origin
      credentials: true, // Allow credentials like cookies
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these HTTP methods
    },
  })
  app.use(bodyParser.json({ limit: '100mb' }))
  app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }))
  await app.listen(3000)
}
bootstrap()

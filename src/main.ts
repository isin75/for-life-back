import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'
import { env } from 'process'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api')
  app.use(cookieParser())
  app.enableCors({
    origin: env.URL_CLIENT,
    credentials: true,
    exposedHeaders: 'set-cookie'
  })
  await app.listen(env.URL)
}
bootstrap()

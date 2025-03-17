import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from "helmet";
import * as cookieParser from 'cookie-parser';
import { ConsoleLogger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: new ConsoleLogger({
      json: true,
      colors:true
    }),
  });
  app.use(helmet())
  app.use(cookieParser())
  await app.listen(3000,()=>{
    console.log('server is running at port 3000');
  });
}

bootstrap();

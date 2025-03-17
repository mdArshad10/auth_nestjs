import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { AuthMiddleware } from './auth.middlewear';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [MongooseModule.forRootAsync({
    useFactory: ()=> ({
        uri:process.env.MONGO_URL,

    }),
  }),
    MongooseModule.forFeature([{ name: User.name, schema:UserSchema}]),
    ConfigModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(AuthMiddleware)
      .exclude(
        {
          path:"users", method:RequestMethod.GET
        }
      )
      .forRoutes(AppController)
  }
}

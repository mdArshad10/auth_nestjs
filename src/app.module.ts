import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { AuthMiddleware } from './auth.middlewear';

@Module({
  imports: [MongooseModule.forRootAsync({
    useFactory: ()=> ({
        uri:"mongodb+srv://arshadwebdeveloper10:uHkVc7AnQ6hhxZie@cluster0.xhpx5.mongodb.net/auth"
    }),
  }),
    MongooseModule.forFeature([{ name: User.name, schema:UserSchema}])
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

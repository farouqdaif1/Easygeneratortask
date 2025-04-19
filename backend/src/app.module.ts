import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserController } from './user/user.controller';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://daiffarouq:Na2xkw2PmRrzlFd8@auth.c5gvimt.mongodb.net/?retryWrites=true&w=majority&appName=auth',
    ),
    AuthModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}

import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthMiddleware } from '../shared/middleware/auth.middleware';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(UserController);
  }
}
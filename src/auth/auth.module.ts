import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthMiddleware } from 'src/shared/middleware/auth.middleware';
import { UserController } from 'src/user/user.controller';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes('auth/sign-out');
    }
}
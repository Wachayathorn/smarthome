import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthMiddleware } from 'src/shared/middleware/auth.middleware';
import { WebsocketModule } from '../websocket/websocket.module';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';

@Module({
  imports: [WebsocketModule],
  controllers: [DeviceController],
  providers: [DeviceService],
})
export class DeviceModule { 
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(DeviceController);
  }
}

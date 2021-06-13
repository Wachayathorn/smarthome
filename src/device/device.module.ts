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
    consumer.apply(AuthMiddleware).forRoutes('device/pi/add-pi', 'device/pi/confirm-otp', 'device/pi/get-pi-by-user-id/:userId', 'device/pi/get-pi-by-id/:piId', 'device/pi/update-status',
      'device/dht/add-dht', 'device/dht/confirm-otp', 'device/dht/get-all-by-pi-id/:piId', 'device/dht/get-all-by-user-id/:userId', 'device/dht/update-status',
      'device/light/add-light', 'device/light/confirm-otp', 'device/light/update-status', 'device/light/get-all-by-pi-id/:piId', 'device/light/get-all-by-user-id/:userId');
  }
}

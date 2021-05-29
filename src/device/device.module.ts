import { Module } from '@nestjs/common';
import { WebsocketModule } from '../websocket/websocket.module';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';

@Module({
  imports: [WebsocketModule],
  controllers: [DeviceController],
  providers: [DeviceService],
})
export class DeviceModule { }

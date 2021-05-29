import { Module } from '@nestjs/common';
import { DeviceModule } from '../device/device.module';
import { WebsocketGateway } from './websocket.service';

@Module({
    imports: [],
    providers: [WebsocketGateway],
    exports: [WebsocketGateway],
})
export class WebsocketModule { }

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DeviceModule } from './device/device.module';
import { UserModule } from './user/user.module';
import databaseConfig from './shared/database/database.config';
import { DatabaseModule } from './shared/database';
import { WebsocketModule } from './websocket/websocket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      isGlobal: true,
    }),
    DatabaseModule,
    WebsocketModule,
    UserModule,
    DeviceModule],
})
export class AppModule { }

import { Logger } from "@nestjs/common";
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { WebSocketTopic } from "./websocket.topic";

@WebSocketGateway({
    transports: ['websocket',
        'flashsocket',
        'htmlfile',
        'xhr-polling',
        'jsonp-polling',
        'polling'],
    pingTimeout: 60000,
    pingInterval: 25000
})
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private logger = new Logger(WebsocketGateway.name);

    @WebSocketServer()
    private readonly server: Server;

    public handleConnection(client: Socket) {
        this.logger.verbose('On Connection by IP:', client.handshake.address);
        this.logger.debug(`On Connected by socket ID: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        this.logger.verbose('On Connection by IP:', client.handshake.address);
        this.logger.debug(`On Disconnected by socket ID: ${client.id}`);
    }

    public async sendOtpRaspberryPi(userId: string, piId: string, otp: string) {
        this.logger.verbose(`Send OTP Raspberry Pi ID : ${piId}`);
        this.server.emit(WebSocketTopic.SEND_OTP_WITH_USER_ID + userId, { device: 'PI', id: piId, otp });
    }

    public async sendOtpDHT(userId: string, dhtId: string, otp: string) {
        this.logger.verbose(`Send OTP DHT ID : ${dhtId}`);
        this.server.emit(WebSocketTopic.SEND_OTP_WITH_USER_ID + userId, { device: 'DHT', id: dhtId, otp });
    }

    public async sendOtpLight(userId: string, lightId: string, otp: string) {
        this.logger.verbose(`Send OTP Light ID : ${lightId}`);
        this.server.emit(WebSocketTopic.SEND_OTP_WITH_USER_ID + userId, { device: 'LIGHT', id: lightId, otp });
    }
}

export class WebSocketTopic {
    private static readonly WS_TOPIC: string = 'WS#';
    public static readonly SEND_OTP_RASPBERRY_PI = `${WebSocketTopic.WS_TOPIC}OTP#RASPBERRY_PI#`;
    public static readonly SEND_OTP_DHT = `${WebSocketTopic.WS_TOPIC}OTP#DHT#`;
}

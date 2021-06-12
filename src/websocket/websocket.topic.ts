export class WebSocketTopic {
    private static readonly WS_TOPIC: string = 'WS#';
    public static readonly SEND_OTP_WITH_USER_ID = `${WebSocketTopic.WS_TOPIC}OTP#USERID#`;
}

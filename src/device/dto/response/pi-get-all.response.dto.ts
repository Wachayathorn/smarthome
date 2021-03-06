import { ApiProperty } from "@nestjs/swagger";
import { DeviceDht, DeviceLight } from "../../../shared/entities";

export class GetAllRaspberryPiByUserId {
    @ApiProperty({ example: '1' })
    piId: string;

    @ApiProperty({ example: 'Raspberry Pi Name' })
    name: string;

    @ApiProperty({ example: 1 })
    status: number;

    @ApiProperty({ example: [DeviceDht.prototype] })
    dhtList: object[];

    @ApiProperty({ example: [DeviceLight.prototype] })
    lightList: object[];

    @ApiProperty({ example: '120.0054154' })
    positionX: string;
  
    @ApiProperty({ example: '12.000' })
    positionY: string;

    @ApiProperty({ example: 1 })
    activated: number;
}
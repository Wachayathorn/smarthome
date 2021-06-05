import { ApiProperty } from '@nestjs/swagger';

export class LightGetValueResponseDto {
  @ApiProperty({ example: '1' })
  lightId: string;
  
  @ApiProperty({ example: '1' })
  piId: string

  @ApiProperty({ example: 'DHT name' })
  name: string;

  @ApiProperty({ example: 1 })
  status: number;

  @ApiProperty({ example: 1 })
  isOnline: number;

  @ApiProperty({ example: 1 })
  switchStatus: number;

  @ApiProperty({ example: '2120.0' })
  positionX: string;

  @ApiProperty({ example: '123' })
  positionY: string;

  @ApiProperty({ example: 1 })
  activated: number;
}
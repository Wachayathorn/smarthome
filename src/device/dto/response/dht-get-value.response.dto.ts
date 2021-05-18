import { ApiProperty } from '@nestjs/swagger';

export class DHTGetValueResponseDto {
  @ApiProperty({ example: '1' })
  dhtId: string;
  
  @ApiProperty({ example: '1' })
  piId: string

  @ApiProperty({ example: 'DHT name' })
  name: string;

  @ApiProperty({ example: 1 })
  status: number;

  @ApiProperty({ example: 1 })
  isOnline: number;

  @ApiProperty({ example: '100' })
  temperature: string;

  @ApiProperty({ example: '100' })
  moisture: string;

  @ApiProperty({ example: '2120.0' })
  positionX: string;

  @ApiProperty({ example: '123' })
  positionY: string;
}
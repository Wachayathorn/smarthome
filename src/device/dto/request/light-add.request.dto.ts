import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddLightRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '1' })
  piId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Light Name' })
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  isOnline: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  switchStatus: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '120.0054154' })
  positionX: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '12.000' })
  positionY: string;
}
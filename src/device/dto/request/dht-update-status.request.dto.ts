import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateDHTStatusRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '1' })
  id: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  status: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  isOnline: number;
}
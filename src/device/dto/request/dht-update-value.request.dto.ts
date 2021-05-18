import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateDHTValueRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '1' })
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '36.9' })
  temperature: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '110' })
  moisture: string;
}
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Firstname' })
  fname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Lastname' })
  lname: string;
}
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignUpRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Firstname' })
  fname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Lastname' })
  lname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Username' })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'password' })
  password: string;
}
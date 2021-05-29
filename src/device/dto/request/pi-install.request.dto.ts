import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class InstallRaspberryPiRequestDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '1' })
    piId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'หน้าบ้าน' })
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '123456' })
    otp: string;
}
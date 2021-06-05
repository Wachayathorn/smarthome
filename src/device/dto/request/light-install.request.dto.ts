import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class InstallLightRequestDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '1' })
    lightId: string;

    // @IsString()
    // @IsNotEmpty()
    // @ApiProperty({ example: 'Test Light' })
    // name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '123456' })
    otp: string;
}
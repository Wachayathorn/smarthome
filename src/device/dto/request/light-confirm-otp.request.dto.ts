import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmOTPLightRequestDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '1' })
    lightId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '123456' })
    otp: string;
}
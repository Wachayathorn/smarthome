import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmOTPDhtRequestDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '1' })
    dhtId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '123456' })
    otp: string;
}
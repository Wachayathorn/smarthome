import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateRaspberryPiStatusRequestDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '1' })
    piId: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 1 })
    status: number;
}
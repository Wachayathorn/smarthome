import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddRaspberryPiRequestDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '1' })
    userId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Raspberry Pi Name' })
    piName: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 1 })
    status: number;
}
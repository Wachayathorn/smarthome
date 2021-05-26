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

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '120.0054154' })
    positionX: string;
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '12.000' })
    positionY: string;
}
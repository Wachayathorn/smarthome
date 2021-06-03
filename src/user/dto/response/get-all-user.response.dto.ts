import { ApiProperty } from "@nestjs/swagger";
import { RaspberryPi } from "../../../shared/entities";

export class GetAllUserResponseDto {
  @ApiProperty({ example: '1' })
  id: string;

  @ApiProperty({ example: 'Firstname' })
  fname: string;

  @ApiProperty({ example: 'Lastname' })
  lname: string;

  @ApiProperty({ example: [RaspberryPi.prototype] })
  piList: object[]
}
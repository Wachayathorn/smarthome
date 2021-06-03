import { ApiProperty } from "@nestjs/swagger";

export class SignInResponseDto {
  @ApiProperty({ example: '1' })
  id: string;

  @ApiProperty({ example: 'Firstname' })
  fname: string;

  @ApiProperty({ example: 'Lastname' })
  lname: string;

  @ApiProperty({ example: 'asdasdasdasdsdlhulfkwepufbdkmckanfwk.sdfhekgfuehflieyguehifjdskluwbusdpijaknjniofuwe.sdfglihvsnchaskbucbu' })
  token: string;
}
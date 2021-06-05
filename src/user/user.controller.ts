import { Controller, Get, Logger, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { GetAllUserResponseDto } from './dto/response';

@ApiTags('Web Application - User')
@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private readonly userService: UserService) { }

  @Get('get-all-user')
  @ApiOperation({ summary: 'Get all users list' })
  @ApiResponse({ status: 200, description: 'Get all users success list', type: [GetAllUserResponseDto] })
  public async getAllUser(): Promise<any> {
    this.logger.verbose('Get all users list');
    const responseMessage = await this.userService.getAllUser();
    return { responseMessage };
  }

  @Get('get-user/:id')
  @ApiOperation({ summary: 'Get user by user ID' })
  @ApiResponse({ status: 200, description: 'Get user by user ID success', type: GetAllUserResponseDto })
  public async getAllUserById(@Param('id') id: string): Promise<any> {
    this.logger.verbose('Get user by user ID');
    const responseMessage = await this.userService.getUserById(id);
    return { responseMessage };
  }
}

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserRequestDto } from './dto/request';
import { UserService } from './user.service';
import { User } from '../shared/entities';
import { GetAllUserResponseDto } from './dto/response';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('create')
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200, description: 'Create user success', type: User })
  public async createUser(@Body() data: CreateUserRequestDto): Promise<any> {
    const responseMessage = await this.userService.createUser(data);
    return { responseMessage };
  }

  @Get('get-all-user')
  @ApiOperation({ summary: 'Get all users list' })
  @ApiResponse({ status: 200, description: 'Get all users success list', type: [GetAllUserResponseDto] })
  public async getAllUser(): Promise<any> {
    const responseMessage = await this.userService.getAllUser();
    return { responseMessage };
  }

  @Get('get-user/:id')
  @ApiOperation({ summary: 'Get user by user ID' })
  @ApiResponse({ status: 200, description: 'Get user by user ID success', type: GetAllUserResponseDto })
  public async getAllUserById(@Param('id') id: string): Promise<any> {
    const responseMessage = await this.userService.getUserById(id);
    return { responseMessage };
  }
}

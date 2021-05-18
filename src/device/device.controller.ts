import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AddDHTRequestDto, AddRaspberryPiRequestDto, UpdateDHTStatusRequestDto, UpdateDHTValueRequestDto, UpdateRaspberryPiStatusRequestDto } from './dto/request';
import { DeviceService } from './device.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetAllRaspberryPiByUserId } from './dto/response';
import { DHTGetValueResponseDto } from './dto/response/dht-get-value.response.dto';

@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) { }

  /////////////////////////////////////////////////////////////////////////////////////

  @Post('/pi/add-pi')
  @ApiOperation({ summary: 'Add Raspberry Pi' })
  @ApiResponse({ status: 200, description: 'Add Raspberry Pi success', type: Boolean })
  public async addRaspberryPi(@Body() data: AddRaspberryPiRequestDto): Promise<any> {
    const responseMessage = await this.deviceService.addRaspberryPi(data);
    return { responseMessage };
  }

  @Get('/pi/get-pi-by-user-id/:userId')
  @ApiOperation({ summary: 'Get Raspberry Pi by user ID' })
  @ApiResponse({ status: 200, description: 'Get Raspberry Pi by user ID success', type: GetAllRaspberryPiByUserId })
  public async getAllRaspberryPiByUserId(@Param('userId') userId: string): Promise<any> {
    const responseMessage = await this.deviceService.getAllRaspberryPiByUserId(userId);
    return { responseMessage };
  }

  @Get('/pi/get-pi-by-id/:piId')
  @ApiOperation({ summary: 'Get Raspberry Pi by ID' })
  @ApiResponse({ status: 200, description: 'Get Raspberry Pi by ID success', type: GetAllRaspberryPiByUserId })
  public async getRaspberryPiById(@Param('piId') piId: string): Promise<any> {
    const responseMessage = await this.deviceService.getRaspberryPiById(piId);
    return { responseMessage };
  }

  @Put('/pi/update-status')
  @ApiOperation({ summary: 'Update Raspberry Pi status' })
  @ApiResponse({ status: 200, description: 'Update Raspberry Pi status success', type: Boolean })
  public async updatePiStatus(@Body() data: UpdateRaspberryPiStatusRequestDto): Promise<any> {
    const responseMessage = await this.deviceService.updatePiStatus(data);
    return { responseMessage };
  }

  /////////////////////////////////////////////////////////////////////////////////////

  @Post('/dht/add-dht')
  @ApiOperation({ summary: 'Add DHT' })
  @ApiResponse({ status: 200, description: 'Add DHT success', type: Boolean })
  public async addDHT(@Body() data: AddDHTRequestDto): Promise<any> {
    const responseMessage = await this.deviceService.addDHT(data);
    return { responseMessage };
  }

  @Get('/dht/get-all-by-pi-id/:piId')
  @ApiOperation({ summary: 'Get all DHT by Raspberry Pi ID' })
  @ApiResponse({ status: 200, description: 'Get all DHT by Raspberry Pi ID success', type: [DHTGetValueResponseDto] })
  public async getDhtByPiId(@Param('piId') piId: string): Promise<any> {
    const responseMessage = await this.deviceService.getDhtByPiId(piId);
    return { responseMessage };
  }

  @Get('/dht/get-all-by-user-id/:userId')
  @ApiOperation({ summary: 'Get all DHT by user ID' })
  @ApiResponse({ status: 200, description: 'Get all DHT by user ID success', type: [DHTGetValueResponseDto] })
  public async getDhtByUserId(@Param('userId') userId: string): Promise<any> {
    const responseMessage = await this.deviceService.getDhtByUserId(userId);
    return { responseMessage };
  }

  @Put('/dht/update-status')
  @ApiOperation({ summary: 'Update DHT status' })
  @ApiResponse({ status: 200, description: 'Update DHT status success', type: Boolean })
  public async updateDHTStatus(@Body() data: UpdateDHTStatusRequestDto): Promise<any> {
    const responseMessage = await this.deviceService.updateDHTStatus(data);
    return { responseMessage };
  }

  @Put('/dht/update-value')
  @ApiOperation({ summary: 'Update DHT value' })
  @ApiResponse({ status: 200, description: 'Update DHT value success', type: Boolean })
  public async updateDHTValue(@Body() data: UpdateDHTValueRequestDto): Promise<any> {
    const responseMessage = await this.deviceService.updateDHTValue(data);
    return { responseMessage };
  }

  /////////////////////////////////////////////////////////////////////////////////////
}
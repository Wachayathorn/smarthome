import { Body, Controller, Get, Logger, Param, Post, Put } from '@nestjs/common';
import { AddDHTRequestDto, AddLightRequestDto, AddRaspberryPiRequestDto, ConfirmOTPDhtRequestDto, ConfirmOTPLightRequestDto, ConfirmOTPRaspberryPiRequestDto, InstallDHTRequestDto, InstallLightRequestDto, InstallRaspberryPiRequestDto, UpdateDHTStatusRequestDto, UpdateDHTValueRequestDto, UpdateLightStatusRequestDto, UpdateLightValueRequestDto, UpdateRaspberryPiStatusRequestDto } from './dto/request';
import { DeviceService } from './device.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetAllRaspberryPiByUserId, LightGetValueResponseDto } from './dto/response';
import { DHTGetValueResponseDto } from './dto/response/dht-get-value.response.dto';
import { DeviceDht, DeviceLight, RaspberryPi } from '../shared/entities';
@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) { }

  private readonly logger = new Logger(DeviceController.name);
  /////////////////////////////////////////////////////////////////////////////////////

  @ApiTags('Web Application - RaspberryPi')
  @Post('/pi/add-pi')
  @ApiOperation({ summary: 'Add Raspberry Pi' })
  @ApiResponse({ status: 200, description: 'Add Raspberry Pi success', type: RaspberryPi })
  public async addRaspberryPi(@Body() data: AddRaspberryPiRequestDto): Promise<any> {
    this.logger.verbose('Add Raspberry Pi');
    const responseMessage = await this.deviceService.addRaspberryPi(data);
    return { responseMessage };
  }

  @ApiTags('Hardware - RaspberryPi')
  @Post('/pi/install')
  @ApiOperation({ summary: 'Install Raspberry Pi' })
  @ApiResponse({ status: 200, description: 'Install Raspberry Pi success', type: Boolean })
  public async installRaspberryPi(@Body() data: InstallRaspberryPiRequestDto): Promise<any> {
    this.logger.verbose(`Install Raspberry Pi ID : ${data.piId}`);
    const responseMessage = await this.deviceService.installRaspberryPi(data);
    return { responseMessage };
  }

  @ApiTags('Web Application - RaspberryPi')
  @Post('/pi/confirm-otp')
  @ApiOperation({ summary: 'Confirm OTP Raspberry Pi' })
  @ApiResponse({ status: 200, description: 'Confirm OTP Raspberry Pi success', type: Boolean })
  public async confirmOtpRaspberryPi(@Body() data: ConfirmOTPRaspberryPiRequestDto): Promise<any> {
    this.logger.verbose(`Confirm OTP Raspberry Pi ID : ${data.piId}`);
    const responseMessage = await this.deviceService.confirmOtpRaspberryPi(data);
    return { responseMessage };
  }

  @ApiTags('Web Application - RaspberryPi')
  @Get('/pi/get-pi-by-user-id/:userId')
  @ApiOperation({ summary: 'Get Raspberry Pi by user ID' })
  @ApiResponse({ status: 200, description: 'Get Raspberry Pi by user ID success', type: GetAllRaspberryPiByUserId })
  public async getAllRaspberryPiByUserId(@Param('userId') userId: string): Promise<any> {
    this.logger.verbose('Get Raspberry Pi by user ID');
    const responseMessage = await this.deviceService.getAllRaspberryPiByUserId(userId);
    return { responseMessage };
  }

  @ApiTags('Web Application - RaspberryPi')
  @Get('/pi/get-pi-by-id/:piId')
  @ApiOperation({ summary: 'Get Raspberry Pi by ID' })
  @ApiResponse({ status: 200, description: 'Get Raspberry Pi by ID success', type: GetAllRaspberryPiByUserId })
  public async getRaspberryPiById(@Param('piId') piId: string): Promise<any> {
    this.logger.verbose('Get Raspberry Pi by ID');
    const responseMessage = await this.deviceService.getRaspberryPiById(piId);
    return { responseMessage };
  }

  @ApiTags('Web Application - RaspberryPi')
  @Put('/pi/update-status')
  @ApiOperation({ summary: 'Update Raspberry Pi status' })
  @ApiResponse({ status: 200, description: 'Update Raspberry Pi status success', type: Boolean })
  public async updatePiStatus(@Body() data: UpdateRaspberryPiStatusRequestDto): Promise<any> {
    this.logger.verbose('Update Raspberry Pi status');
    const responseMessage = await this.deviceService.updatePiStatus(data);
    return { responseMessage };
  }

  /////////////////////////////////////////////////////////////////////////////////////

  @ApiTags('Web Application - DHT')
  @Post('/dht/add-dht')
  @ApiOperation({ summary: 'Add DHT' })
  @ApiResponse({ status: 200, description: 'Add DHT success', type: DeviceDht })
  public async addDHT(@Body() data: AddDHTRequestDto): Promise<any> {
    this.logger.verbose('Add DHT');
    const responseMessage = await this.deviceService.addDHT(data);
    return { responseMessage };
  }

  @ApiTags('Hardware - DHT')
  @Post('/dht/install')
  @ApiOperation({ summary: 'Install DHT' })
  @ApiResponse({ status: 200, description: 'Install DHT success', type: Boolean })
  public async installDHT(@Body() data: InstallDHTRequestDto): Promise<any> {
    this.logger.verbose(`Install DHT ID : ${data.dhtId}`);
    const responseMessage = await this.deviceService.installDHT(data);
    return { responseMessage };
  }

  @ApiTags('Web Application - DHT')
  @Post('/dht/confirm-otp')
  @ApiOperation({ summary: 'Confirm OTP DHT' })
  @ApiResponse({ status: 200, description: 'Confirm OTP DHT success', type: Boolean })
  public async confirmOtpDHT(@Body() data: ConfirmOTPDhtRequestDto): Promise<any> {
    this.logger.verbose(`Confirm OTP DHT ID : ${data.dhtId}`);
    const responseMessage = await this.deviceService.confirmOtpDHT(data);
    return { responseMessage };
  }

  @ApiTags('Web Application - DHT')
  @Get('/dht/get-all-by-pi-id/:piId')
  @ApiOperation({ summary: 'Get all DHT by Raspberry Pi ID' })
  @ApiResponse({ status: 200, description: 'Get all DHT by Raspberry Pi ID success', type: [DHTGetValueResponseDto] })
  public async getDhtByPiId(@Param('piId') piId: string): Promise<any> {
    this.logger.verbose('Get all DHT by Raspberry Pi ID');
    const responseMessage = await this.deviceService.getDhtByPiId(piId);
    return { responseMessage };
  }

  @ApiTags('Web Application - DHT')
  @Get('/dht/get-all-by-user-id/:userId')
  @ApiOperation({ summary: 'Get all DHT by user ID' })
  @ApiResponse({ status: 200, description: 'Get all DHT by user ID success', type: [DHTGetValueResponseDto] })
  public async getDhtByUserId(@Param('userId') userId: string): Promise<any> {
    this.logger.verbose('Get all DHT by user ID');
    const responseMessage = await this.deviceService.getDhtByUserId(userId);
    return { responseMessage };
  }

  @ApiTags('Web Application - DHT')
  @Put('/dht/update-status')
  @ApiOperation({ summary: 'Update DHT status' })
  @ApiResponse({ status: 200, description: 'Update DHT status success', type: Boolean })
  public async updateDHTStatus(@Body() data: UpdateDHTStatusRequestDto): Promise<any> {
    this.logger.verbose('Update DHT status');
    const responseMessage = await this.deviceService.updateDHTStatus(data);
    return { responseMessage };
  }

  @ApiTags('Hardware - DHT')
  @Put('/dht/update-value')
  @ApiOperation({ summary: 'Update DHT value' })
  @ApiResponse({ status: 200, description: 'Update DHT value success', type: Boolean })
  public async updateDHTValue(@Body() data: UpdateDHTValueRequestDto): Promise<any> {
    this.logger.verbose('Update DHT value');
    const responseMessage = await this.deviceService.updateDHTValue(data);
    return { responseMessage };
  }

  /////////////////////////////////////////////////////////////////////////////////////

  @ApiTags('Web Application - Light')
  @Post('/light/add-light')
  @ApiOperation({ summary: 'Add light' })
  @ApiResponse({ status: 200, description: 'Add light success', type: DeviceLight })
  public async addLight(@Body() data: AddLightRequestDto): Promise<any> {
    this.logger.verbose('Add light');
    const responseMessage = await this.deviceService.addLight(data);
    return { responseMessage };
  }

  @ApiTags('Hardware - Light')
  @Post('/light/install')
  @ApiOperation({ summary: 'Install light' })
  @ApiResponse({ status: 200, description: 'Install light success', type: Boolean })
  public async installLight(@Body() data: InstallLightRequestDto): Promise<any> {
    this.logger.verbose(`Install light ID : ${data.lightId}`);
    const responseMessage = await this.deviceService.installLight(data);
    return { responseMessage };
  }

  @ApiTags('Web Application - Light')
  @Post('/light/confirm-otp')
  @ApiOperation({ summary: 'Confirm OTP light' })
  @ApiResponse({ status: 200, description: 'Confirm OTP light success', type: Boolean })
  public async confirmOtpLight(@Body() data: ConfirmOTPLightRequestDto): Promise<any> {
    this.logger.verbose(`Confirm OTP light ID : ${data.lightId}`);
    const responseMessage = await this.deviceService.confirmOtpLight(data);
    return { responseMessage };
  }

  @ApiTags('Web Application - Light')
  @Put('/light/update-status')
  @ApiOperation({ summary: 'Update light status' })
  @ApiResponse({ status: 200, description: 'Update light status success', type: Boolean })
  public async updateLightStatus(@Body() data: UpdateLightStatusRequestDto): Promise<any> {
    this.logger.verbose('Update light status');
    const responseMessage = await this.deviceService.updateLightStatus(data);
    return { responseMessage };
  }

  @ApiTags('Web Application & Hardware - Light')
  @Put('/light/update-switch-status')
  @ApiOperation({ summary: 'Update light switch' })
  @ApiResponse({ status: 200, description: 'Update light switch success', type: Boolean })
  public async updateLightSwitchStatus(@Body() data: UpdateLightValueRequestDto): Promise<any> {
    this.logger.verbose('Update light switch status');
    const responseMessage = await this.deviceService.updateLightSwitchStatus(data);
    return { responseMessage };
  }

  @ApiTags('Web Application - Light')
  @Get('/light/get-all-by-pi-id/:piId')
  @ApiOperation({ summary: 'Get all light by Raspberry Pi ID' })
  @ApiResponse({ status: 200, description: 'Get all light by Raspberry Pi ID success', type: [LightGetValueResponseDto] })
  public async getLightByPiId(@Param('piId') piId: string): Promise<any> {
    this.logger.verbose('Get all light by Raspberry Pi ID');
    const responseMessage = await this.deviceService.getLightByPiId(piId);
    return { responseMessage };
  }

  @ApiTags('Web Application - Light')
  @Get('/light/get-all-by-user-id/:userId')
  @ApiOperation({ summary: 'Get all light by user ID' })
  @ApiResponse({ status: 200, description: 'Get all light by user ID success', type: [LightGetValueResponseDto] })
  public async getLightByUserId(@Param('userId') userId: string): Promise<any> {
    this.logger.verbose('Get all light by user ID');
    const responseMessage = await this.deviceService.getLightByUserId(userId);
    return { responseMessage };
  }
}
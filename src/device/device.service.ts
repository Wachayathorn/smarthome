import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { AddDHTRequestDto, AddRaspberryPiRequestDto, ConfirmOTPDhtRequestDto, ConfirmOTPRaspberryPiRequestDto, InstallDHTRequestDto, InstallRaspberryPiRequestDto, UpdateDHTStatusRequestDto, UpdateDHTValueRequestDto, UpdateRaspberryPiStatusRequestDto } from './dto/request';
import { DeviceDht, RaspberryPi, User } from '../shared/entities';
import { GetAllRaspberryPiByUserId } from './dto/response';
import { MessageError } from '../shared/message/message.error';
import { DHTGetValueResponseDto } from './dto/response/dht-get-value.response.dto';
import { WebsocketGateway } from '../websocket/websocket.service';

@Injectable()
export class DeviceService {
  private readonly logger = new Logger(DeviceService.name);

  constructor(
    private readonly websocketGateway: WebsocketGateway,
  ) { }


  public async addRaspberryPi(data: AddRaspberryPiRequestDto): Promise<any> {
    try {
      const piData = new RaspberryPi();
      piData.name = data.piName;
      piData.status = data.status;
      piData.createTime = new Date();
      piData.positionX = data.positionX;
      piData.positionY = data.positionY;
      const user = await User.findOne({ id: data.userId });
      if (!user) {
        throw new HttpException({ error: MessageError.USER_INVALID }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
      piData.userId = data.userId;
      await piData.save();
      return piData;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  public async installRaspberryPi(data: InstallRaspberryPiRequestDto): Promise<any> {
    try {
      const havePi = await RaspberryPi.findOne({ piId: data.piId });
      if (!havePi) {
        throw new HttpException({ error: MessageError.RASPBERRY_PI_INVALID }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
      await RaspberryPi.update({ piId: data.piId }, { otp: data.otp });
      this.websocketGateway.sendOtpRaspberryPi(data.piId, data.otp);
      return true;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  public async confirmOtpRaspberryPi(data: ConfirmOTPRaspberryPiRequestDto): Promise<any> {
    try {
      const piData = await RaspberryPi.findOne({ piId: data.piId });
      if (piData.otp === data.otp) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  public async getAllRaspberryPiByUserId(userId: string): Promise<any> {
    try {
      const user = await User.findOne({ id: userId });
      if (!user) {
        throw new HttpException({ error: MessageError.USER_INVALID }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
      const piList = await RaspberryPi.createQueryBuilder('RaspberryPi')
        .leftJoinAndSelect('RaspberryPi.deviceLights', 'DeviceLight')
        .leftJoinAndSelect('RaspberryPi.deviceDhts', 'DeviceDht')
        .where('RaspberryPi.userId=:userId', { userId })
        .getMany();
      const responseData = piList.map(pi => {
        return Object.assign(new GetAllRaspberryPiByUserId(), {
          piId: pi.piId,
          name: pi.name,
          status: pi.status,
          dhtList: pi.deviceDhts,
          lightList: pi.deviceLights,
          positionX: pi.positionX,
          positionY: pi.positionY
        })
      });
      return responseData;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  public async getRaspberryPiById(piId: string): Promise<any> {
    try {
      const pi = await RaspberryPi.createQueryBuilder('RaspberryPi')
        .leftJoinAndSelect('RaspberryPi.deviceLights', 'DeviceLight')
        .leftJoinAndSelect('RaspberryPi.deviceDhts', 'DeviceDht')
        .where('RaspberryPi.piId=:piId', { piId })
        .getOne();
      if (!pi) {
        return null
      } else {
        return Object.assign(new GetAllRaspberryPiByUserId(), {
          piId: pi.piId,
          name: pi.name,
          status: pi.status,
          dhtList: pi.deviceDhts,
          lightList: pi.deviceLights,
          positionX: pi.positionX,
          positionY: pi.positionY
        });
      }
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  public async updatePiStatus(data: UpdateRaspberryPiStatusRequestDto): Promise<any> {
    try {
      await RaspberryPi.update({ piId: data.piId }, { status: data.status });
      return true;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  public async addDHT(data: AddDHTRequestDto): Promise<any> {
    try {
      const piData = await RaspberryPi.findOne({ piId: data.piId });
      if (!piData) {
        throw new HttpException({ error: MessageError.RASPBERRY_PI_INVALID }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
      const dht = new DeviceDht();
      dht.name = data.name;
      dht.status = 1;
      dht.isOnline = data.isOnline;
      dht.swLastUpdate = new Date();
      dht.piId = piData.piId;
      dht.positionX = data.positionX;
      dht.positionY = data.positionY;
      await dht.save();
      return dht;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  public async installDHT(data: InstallDHTRequestDto): Promise<any> {
    try {
      const haveDHT = await DeviceDht.findOne({ dhtId: data.dhtId });
      if (!haveDHT) {
        throw new HttpException({ error: MessageError.DHT_INVALID }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
      await DeviceDht.update({ dhtId: data.dhtId }, { otp: data.otp });
      this.websocketGateway.sendOtpRaspberryPi(data.dhtId, data.otp);
      return true;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  public async confirmOtpDHT(data: ConfirmOTPDhtRequestDto): Promise<any> {
    try {
      const DHTData = await DeviceDht.findOne({ dhtId: data.dhtId });
      if (DHTData.otp === data.otp) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  public async updateDHTStatus(data: UpdateDHTStatusRequestDto) {
    try {
      await DeviceDht.update({ dhtId: data.id }, { status: data.status, isOnline: data.isOnline });
      return true;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  public async updateDHTValue(data: UpdateDHTValueRequestDto) {
    try {
      await DeviceDht.update({ dhtId: data.id }, { temperature: data.temperature, moisture: data.moisture });
      return true;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  public async getDhtByPiId(piId: string): Promise<any> {
    try {
      const piData = await RaspberryPi.findOne({ piId });
      if (!piData) {
        throw new HttpException({ error: MessageError.RASPBERRY_PI_INVALID }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
      const dhtList = await DeviceDht.find({ piId });
      return dhtList;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  public async getDhtByUserId(userId: string) {
    try {
      const user = await User.findOne({ id: userId });
      if (!user) {
        throw new HttpException({ error: MessageError.USER_INVALID }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
      const piList = await RaspberryPi.createQueryBuilder('RaspberryPi')
        .leftJoinAndSelect('RaspberryPi.deviceDhts', 'DeviceDht')
        .where('RaspberryPi.userId=:userId', { userId })
        .getMany();
      const responseList = [];
      for (const piData of piList) {
        if (piData.deviceDhts) {
          for (const dhtData of piData.deviceDhts) {
            const model = Object.assign(new DHTGetValueResponseDto(), {
              dhtId: dhtData.dhtId,
              piId: dhtData.piId,
              name: dhtData.name,
              status: dhtData.status,
              isOnline: dhtData.isOnline,
              temperature: dhtData.temperature,
              moisture: dhtData.moisture,
              positionX: dhtData.positionX,
              positionY: dhtData.positionY
            });
            responseList.push(model);
          }
        }
      }
      return responseList;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
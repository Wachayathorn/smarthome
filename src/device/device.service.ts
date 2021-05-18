import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AddDHTRequestDto, AddRaspberryPiRequestDto, UpdateDHTStatusRequestDto, UpdateDHTValueRequestDto, UpdateRaspberryPiStatusRequestDto } from './dto/request';
import { DeviceDht, RaspberryPi, User } from '../shared/entities';
import { GetAllRaspberryPiByUserId } from './dto/response';
import { MessageError } from '../shared/message/message.error';
import { DHTGetValueResponseDto } from './dto/response/dht-get-value.response.dto';

@Injectable()
export class DeviceService {
  public async addRaspberryPi(data: AddRaspberryPiRequestDto): Promise<any> {
    try {
      const piData = new RaspberryPi();
      piData.name = data.piName;
      piData.status = data.status;
      piData.createTime = new Date();
      const user = await User.findOne({ id: data.userId });
      if (!user) {
        throw new HttpException({ status: HttpStatus.INTERNAL_SERVER_ERROR, error: MessageError.USER_INVALID }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
      piData.userId = data.userId;
      await piData.save();
      return true;
    } catch (error) {
      throw error;
    }
  }

  public async getAllRaspberryPiByUserId(userId: string): Promise<any> {
    try {
      const user = await User.findOne({ id: userId });
      if (!user) {
        throw new HttpException({ status: HttpStatus.INTERNAL_SERVER_ERROR, error: MessageError.USER_INVALID }, HttpStatus.INTERNAL_SERVER_ERROR);
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
          lightList: pi.deviceLights
        })
      });
      return responseData;
    } catch (error) {
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
          lightList: pi.deviceLights
        });
      }
    } catch (error) {
      throw error;
    }
  }

  public async updatePiStatus(data: UpdateRaspberryPiStatusRequestDto): Promise<any> {
    try {
      await RaspberryPi.update({ piId: data.piId }, { status: data.status });
      return true;
    } catch (error) {
      throw error;
    }
  }

  public async addDHT(data: AddDHTRequestDto): Promise<any> {
    try {
      const piData = await RaspberryPi.findOne({ piId: data.piId });
      if (!piData) {
        throw new HttpException({ status: HttpStatus.INTERNAL_SERVER_ERROR, error: MessageError.RASPBERRY_PI_INVALID }, HttpStatus.INTERNAL_SERVER_ERROR);
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
      return true;
    } catch (error) {
      throw error;
    }
  }

  public async updateDHTStatus(data: UpdateDHTStatusRequestDto) {
    try {
      await DeviceDht.update({ dhtId: data.id }, { status: data.status, isOnline: data.isOnline });
      return true;
    } catch (error) {
      throw error;
    }
  }

  public async updateDHTValue(data: UpdateDHTValueRequestDto) {
    try {
      await DeviceDht.update({ dhtId: data.id }, { temperature: data.temperature, moisture: data.moisture });
      return true;
    } catch (error) {
      throw error;
    }
  }

  public async getDhtByPiId(piId: string): Promise<any> {
    try {
      const piData = await RaspberryPi.findOne({ piId });
      if (!piData) {
        throw new HttpException({ status: HttpStatus.INTERNAL_SERVER_ERROR, error: MessageError.RASPBERRY_PI_INVALID }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
      const dhtList = await DeviceDht.find({ piId });
      return dhtList;
    } catch (error) {
      throw error;
    }
  }

  public async getDhtByUserId(userId: string) {
    try {
      const user = await User.findOne({ id: userId });
      if (!user) {
        throw new HttpException({ status: HttpStatus.INTERNAL_SERVER_ERROR, error: MessageError.USER_INVALID }, HttpStatus.INTERNAL_SERVER_ERROR);
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
      throw error;
    }
  }
}
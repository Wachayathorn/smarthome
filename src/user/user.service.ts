import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MessageError } from '../shared/message/message.error';
import { User } from '../shared/entities';
import { CreateUserRequestDto } from './dto/request';
import { GetAllUserResponseDto } from './dto/response';

@Injectable()
export class UserService {
  public async createUser(data: CreateUserRequestDto): Promise<User> {
    try {
      const user = new User();
      user.fname = data.fname;
      user.lname = data.lname;
      user.createTime = new Date();
      await user.save();
      return user;
    } catch (error) {
      throw error;
    }
  }

  public async getAllUser(): Promise<GetAllUserResponseDto[]> {
    try {
      const userList = await User.createQueryBuilder('user')
        .leftJoinAndSelect('user.raspberryPis', 'RaspberryPi')
        .getMany();
      const responseDataList = userList.map(user => {
        return Object.assign(new GetAllUserResponseDto(), {
          id: user.id,
          fname: user.fname,
          lname: user.lname,
          piList: user.raspberryPis
        });
      })
      return responseDataList;
    } catch (error) {
      throw error;
    }
  }

  public async getUserById(id: string): Promise<GetAllUserResponseDto> {
    try {
      const user = await User.createQueryBuilder('user')
        .leftJoinAndSelect('user.raspberryPis', 'RaspberryPi')
        .where('user.id=:id', { id })
        .getOne();
      if (!user) {
        throw new HttpException({ status: HttpStatus.INTERNAL_SERVER_ERROR, error: MessageError.USER_INVALID }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
      return Object.assign(new GetAllUserResponseDto(), {
        id: user.id,
        fname: user.fname,
        lname: user.lname,
        piList: user.raspberryPis
      });
    } catch (error) {
      throw error;
    }
  }
}
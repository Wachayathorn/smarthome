import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { User } from "../shared/entities";
import { SignInRequestDto, SignUpRequestDto } from "./dto/request";
import { SignInResponseDto } from "./dto/response";
import { MessageError } from "../shared/message/message.error";
import * as bcrypt from 'bcrypt';
const redis = require('redis');
const JWTR = require('jwt-redis').default;

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly redisClient = redis.createClient(process.env.REDIS_SERVER);
  private readonly jwtr = new JWTR(this.redisClient);

  public async signUp(data: SignUpRequestDto): Promise<User> {
    try {
      const isInvalid = await User.findOne({ username: data.username });
      if (isInvalid) {
        throw new HttpException({ error: MessageError.USERNAME_IS_REPEAT }, HttpStatus.BAD_REQUEST);
      }
      const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS));
      const user = new User();
      user.fname = data.fname;
      user.lname = data.lname;
      user.createTime = new Date();
      user.username = data.username;
      user.password = bcrypt.hashSync(data.password, salt);
      await user.save();
      return user;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  public async signIn(data: SignInRequestDto): Promise<SignInResponseDto> {
    try {
      const user = await User.findOne({ username: data.username });
      if (!user) {
        throw new HttpException({ error: MessageError.USERNAME_OR_PASSWORD_INVALID }, HttpStatus.UNAUTHORIZED);
      }
      const isPasswordTrue = bcrypt.compareSync(data.password, user.password);
      if (!isPasswordTrue) {
        throw new HttpException({ error: MessageError.USERNAME_OR_PASSWORD_INVALID }, HttpStatus.UNAUTHORIZED);
      }
      const token = await this.jwtr.sign({ id: user.id, fname: user.fname, lname: user.lname }, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRE });
      const response = Object.assign(new SignInResponseDto(), { id: user.id, fname: user.fname, lname: user.lname, token });
      return response;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  public async signOut(payload: object): Promise<Boolean> {
    try {
      await this.jwtr.destroy(payload['jti'], process.env.JWT_KEY);
      return true;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
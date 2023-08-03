import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';

import * as bcrypt from 'bcrypt';
import { User } from '../users/models/user.model';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async registration(userDto: CreateUserDto) {
    const condidate = await this.userService.getUserByEmail(userDto.email);
    if (condidate) {
      throw new HttpException(
        'Bunday foydalanuvchi mavjud',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(userDto.password, 7);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashedPassword,
    });
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return { token: this.jwtService.sign(payload) };
  }

  // async loginUser(userDto: CreateUserDto) {
  //   const data = await this.userService.getUser(
  //     userDto.email,
  //     userDto.password,
  //   );
  //   if (!data) {
  //     throw new HttpException(
  //       'Bunday foydalanuvchi mavjud emas',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  //   return this.generateToken(data);
  // }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto);
    if (!user) {
      throw new HttpException('Foydalanuvchi topilmadi', HttpStatus.NOT_FOUND);
    }
    return this.generateToken(user)
  }

  private async validateUser(loginDto: LoginDto) {
    const user = await this.userService.getUserByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException("Email yoki Parol noto'g'ri");
    }
    console.log('=----------------------');
    const validPassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (validPassword) {
      return user;
    }
    throw new UnauthorizedException("Email yoki Parol noto'g'ri");
  }
}

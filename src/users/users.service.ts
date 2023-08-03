import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from '../roles/roles.service';
import { ActivateUserDto } from './dto/activate-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepo: typeof User,
    private readonly roleService: RolesService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const newUser = await this.userRepo.create(createUserDto);
    const role = await this.roleService.getRoleByValue('ADMIN');
    // const role = await this.roleService.getRoleByValue('USER')
    if (!role) {
      throw new BadRequestException('Role not found');
    }
    await newUser.$set('roles', [role.id]);
    await newUser.save();
    newUser.roles = [role];
    return newUser;
  }

  async getAllUsers() {
    const users = await this.userRepo.findAll({ include: { all: true } });
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepo.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async getOneUser(id: number) {
    const user = await this.userRepo.findOne({
      where: { id },
      include: { all: true },
    });
    return user;
  }

  async getUser(email: string, password: string) {
    const data = await this.userRepo.findOne({
      where: { email, password },
    });
    return data;
  }

  async addRole(addRoleDto: AddRoleDto) {
    const user = await this.userRepo.findByPk(addRoleDto.userId);
    const role = await this.roleService.getRoleByValue(addRoleDto.value);

    if (role && user) {
      await user.$add('roles', role.id);
      const updateUser = await this.userRepo.findByPk(addRoleDto.userId, {
        include: { all: true },
      });
      return updateUser;
    }

    throw new HttpException(
      'Foydalanuvchi yoki rol topilmadi',
      HttpStatus.NOT_FOUND,
    );
  }

  async removeRole(addRoleDto: AddRoleDto) {
    const user = await this.userRepo.findByPk(addRoleDto.userId);
    const role = await this.roleService.getRoleByValue(addRoleDto.value);

    if (role && user) {
      await user.$remove('roles', role.id);
      const updateUser = await this.userRepo.findByPk(addRoleDto.userId, {
        include: { all: true },
      });
      return updateUser;
    }

    throw new HttpException(
      'Foydalanuvchi yoki rol topilmadi',
      HttpStatus.NOT_FOUND,
    );
  }

  async activateUser(activateUserDto: ActivateUserDto) {
    const user = await this.userRepo.findByPk(activateUserDto.userId);
    if (!user) {
      throw new HttpException('Foydalanuvchi topilmadi', HttpStatus.NOT_FOUND);
    }
    user.is_active = true;
    await user.save();
    return user;
  }

  async deactivateUser(activateUserDto: ActivateUserDto) {
    const user = await this.userRepo.findByPk(activateUserDto.userId);
    if (!user) {
      throw new HttpException('Foydalanuvchi topilmadi', HttpStatus.NOT_FOUND);
    }
    user.is_active = false;
    await user.save();
    return user;
  }

  async deleteUser(id: number): Promise<{ message: string }> {
    const user = await this.userRepo.destroy({ where: { id } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'User deleted' };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

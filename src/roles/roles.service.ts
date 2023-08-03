import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './models/role.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepo: typeof Role) {}

  async createRole(createRoleDto: CreateRoleDto) {
    const newRole = await this.roleRepo.create(createRoleDto)
    return newRole;
  }

  async getAllRoles() {
    const roles = await this.roleRepo.findAll({include:{all:true}});
    return roles;
  }

  async getRoleByValue(value: string) {
    const role = await this.roleRepo.findOne({where:{value}})
    return role;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}

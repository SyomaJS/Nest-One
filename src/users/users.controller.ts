import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.model';
import { AddRoleDto } from './dto/add-role.dto';
import { ActivateUserDto } from './dto/activate-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserSelfGuard } from '../guards/user-self.guard';
import { Role } from '../roles/models/role.model';
import { Roles } from '../decorators/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('Foydalanuvchilar')
@Roles('USER')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Foydalanuvchi yaratish' })
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @ApiOperation({ summary: "Foydalanuvchilarni ko'rish" })
  @ApiResponse({ status: 200, description: 'List of users', type: [User] })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: "Foydalanuvchini ID bo'yicha ko'rish" })
  @UseGuards(UserSelfGuard)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.getOneUser(id);
  }

  @ApiOperation({ summary: "Foydalanuvchini email bo'yicha korish" })
  @Get(':email')
  getUserByEmail(@Param('email') email: string) {
    return this.usersService.getUserByEmail(email);
  }

  @ApiOperation({ summary: "Foydalanuvchi ma'lumotlarini yangilash" })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: "Foydalanuvchini ID bo'yicha o'chirish" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @ApiOperation({ summary: "Foydalanuvchiga role qo'shish" })
  @HttpCode(200)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('add_role')
  addRole(@Body() addRoleDto: AddRoleDto) {
    return this.usersService.addRole(addRoleDto);
  }
 
  @ApiOperation({ summary: 'Foydalanuvchi roleni olib tashlash' })
  @HttpCode(200)
  @Post('remove_role')
  removeRole(@Body() addRoleDto: AddRoleDto) {
    return this.usersService.removeRole(addRoleDto);
  }

  @ApiOperation({ summary: 'Foydalanuvchini activlashtirish' })
  @HttpCode(200)
  @Post('activate')
  activateUser(@Body() activateUserDto: ActivateUserDto) {
    return this.usersService.activateUser(activateUserDto);
  }

  @ApiOperation({ summary: 'Foydalanuvchini deactivlashtirish' })
  @HttpCode(200)
  @Post('deactivate')
  deactivateUser(@Body() activateUserDto: ActivateUserDto) {
    return this.usersService.deactivateUser(activateUserDto);
  }
}

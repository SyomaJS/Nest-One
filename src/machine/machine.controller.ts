import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MachineService } from './machine.service';
import { createMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { Machine } from './models/machine.model';

@Controller('machine')
export class MachineController {
  constructor(private readonly machineService: MachineService) {}

  @Post('create')
  async createMachine(
    @Body() createMachineDto: createMachineDto,
  ): Promise<Machine> {
    return this.machineService.createMachine(createMachineDto);
  }

  @Get('all')
  async getAllMachine(): Promise<Machine[]> {
    return this.machineService.getAllMachine();
  }

  @Get(':id')
  async getMachineById(@Param('id') id: string): Promise<Machine> {
    return this.machineService.getMachineById(+id);
  }
  @Get(':name')
  async getMachineByName(@Param('name') name: string): Promise<Machine> {
    return this.machineService.getMachineByName(name);
  }
  @Delete(':id')
  async deleteMachineById(@Param('id') id: string): Promise<number> {
    return this.machineService.deleteMachineById(+id);
  }
  @Put(':id')
  async updateMachine(
    @Param('id') id: string,
    @Body() updateMachineDto: UpdateMachineDto,
  ): Promise<[number, Machine[]]> {
    return this.machineService.updateMachine(+id, updateMachineDto);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Machine_driverService } from './machine_driver.service';
import { createMachine_driverDto } from './dto/create-machine_driver.dto';
import { UpdateMachine_driverDto } from './dto/update-machine_driver.dto';
import { Machine_driver } from './models/machine_driver.model';

@Controller('machine_driver')
export class Machine_driverController {
  constructor(private readonly machine_driverService: Machine_driverService) {}

  @Post('create')
  async createMachine_driver(
    @Body() createMachine_driverDto: createMachine_driverDto,
  ): Promise<Machine_driver> {
    return this.machine_driverService.createMachine_driver(createMachine_driverDto);
  }

  @Get('all')
  async getAllMachine_driver(): Promise<Machine_driver[]> {
    return this.machine_driverService.getAllMachine_driver();
  }

  @Get(':id')
  async getMachine_driverById(@Param('id') id: string): Promise<Machine_driver> {
    return this.machine_driverService.getMachine_driverById(+id);
  }
//   @Get(':name')
//   async getMachine_driverByName(@Param('name') name: string): Promise<Machine_driver> {
//     return this.machine_driverService.getMachine_driverByName(name);
//   }
  @Delete(':id')
  async deleteMachine_driverById(@Param('id') id: string): Promise<number> {
    return this.machine_driverService.deleteMachine_driverById(+id);
  }
  @Put(':id')
  async updateMachine_driver(
    @Param('id') id: string,
    @Body() updateMachine_driverDto: UpdateMachine_driverDto,
  ): Promise<[number, Machine_driver[]]> {
    return this.machine_driverService.updateMachine_driver(+id, updateMachine_driverDto);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DriverService } from './driver.service';
import { createDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Driver } from './models/driver.model';

@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post('create')
  async createDriver(
    @Body() createDriverDto: createDriverDto,
  ): Promise<Driver> {
    return this.driverService.createDriver(createDriverDto);
  }

  @Get('all')
  async getAllDriver(): Promise<Driver[]> {
    return this.driverService.getAllDriver();
  }

  @Get(':id')
  async getDriverById(@Param('id') id: string): Promise<Driver> {
    return this.driverService.getDriverById(+id);
  }
//   @Get(':name')
//   async getDriverByName(@Param('name') name: string): Promise<Driver> {
//     return this.driverService.getDriverByName(name);
//   }
  @Delete(':id')
  async deleteDriverById(@Param('id') id: string): Promise<number> {
    return this.driverService.deleteDriverById(+id);
  }
  @Put(':id')
  async updateDriver(
    @Param('id') id: string,
    @Body() updateDriverDto: UpdateDriverDto,
  ): Promise<[number, Driver[]]> {
    return this.driverService.updateDriver(+id, updateDriverDto);
  }
}

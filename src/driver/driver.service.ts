import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Driver } from './models/driver.model';

@Injectable()
export class DriverService {
  constructor(@InjectModel(Driver) private driverRepo:typeof Driver) {}
  async createDriver(createDriverDto: createDriverDto): Promise<Driver> {
    const driver = await this.driverRepo.create(createDriverDto);
    return driver;
  }
  async getAllDriver(): Promise<Driver[]> {
    const companies = await this.driverRepo.findAll({
      include: { all: true },
    });
    return companies;
  }
  async getDriverById(id: number): Promise<Driver> {
    // const driver = await this.driverRepo.findByPk(id);
    const driver = await this.driverRepo.findOne({
      where: { id },
      include: { all: true },
    });
    return driver;
  }

//   async getDriverByName(name: string): Promise<Driver> {
//     // const driver = await this.driverRepo.findByPk(id);
//     const driver = await this.driverRepo.findOne({ where: { name } });
//     return driver;
//   }
  async deleteDriverById(id: number): Promise<number> {
    return this.driverRepo.destroy({ where: { id } });
  }

  //   async updateDriver(id:number,updateDriverDto:UpdateDriverDto):Promise<Driver>{
  //     const driver =await this.driverRepo.update(updateDriverDto,{where:{id},returning:true})
  //     return driver
  //   }
  async updateDriver(
    id: number,
    updateDriverDto: UpdateDriverDto,
  ): Promise<[number, Driver[]]> {
    const [affectedCount, affectedRows] = await this.driverRepo.update(
      updateDriverDto,
      {
        where: { id },
        returning: true,
      },
    );
    return [affectedCount, affectedRows];
  }
}

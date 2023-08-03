import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createMachine_driverDto } from './dto/create-machine_driver.dto';
import { UpdateMachine_driverDto } from './dto/update-machine_driver.dto';
import { Machine_driver } from './models/machine_driver.model';

@Injectable()
export class Machine_driverService {
  constructor(@InjectModel(Machine_driver) private machine_driverRepo:typeof Machine_driver) {}
  async createMachine_driver(createMachine_driverDto: createMachine_driverDto): Promise<Machine_driver> {
    const machine_driver = await this.machine_driverRepo.create(createMachine_driverDto);
    return machine_driver;
  }
  async getAllMachine_driver(): Promise<Machine_driver[]> {
    const companies = await this.machine_driverRepo.findAll({
      include: { all: true },
    });
    return companies;
  }
  async getMachine_driverById(id: number): Promise<Machine_driver> {
    // const machine_driver = await this.machine_driverRepo.findByPk(id);
    const machine_driver = await this.machine_driverRepo.findOne({
      where: { id },
      include: { all: true },
    });
    return machine_driver;
  }

//   async getMachine_driverByName(name: string): Promise<Machine_driver> {
//     // const machine_driver = await this.machine_driverRepo.findByPk(id);
//     const machine_driver = await this.machine_driverRepo.findOne({ where: { name } });
//     return machine_driver;
//   }
  async deleteMachine_driverById(id: number): Promise<number> {
    return this.machine_driverRepo.destroy({ where: { id } });
  }

  //   async updateMachine_driver(id:number,updateMachine_driverDto:UpdateMachine_driverDto):Promise<Machine_driver>{
  //     const machine_driver =await this.machine_driverRepo.update(updateMachine_driverDto,{where:{id},returning:true})
  //     return machine_driver
  //   }
  async updateMachine_driver(
    id: number,
    updateMachine_driverDto: UpdateMachine_driverDto,
  ): Promise<[number, Machine_driver[]]> {
    const [affectedCount, affectedRows] = await this.machine_driverRepo.update(
      updateMachine_driverDto,
      {
        where: { id },
        returning: true,
      },
    );
    return [affectedCount, affectedRows];
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createBuilderDto } from './dto/create-builder.dto';
import { UpdateBuilderDto } from './dto/update-builder.dto';
import { Builder } from './models/builder.model';

@Injectable()
export class BuilderService {
  constructor(@InjectModel(Builder) private builderRepo: typeof Builder) {}
  async createBuilder(createBuilderDto: createBuilderDto): Promise<Builder> {
    const builder = await this.builderRepo.create(createBuilderDto);
    return builder;
  }
  async getAllBuilder(): Promise<Builder[]> {
    const companies = await this.builderRepo.findAll({
      include: { all: true },
    });
    return companies;
  }
  async getBuilderById(id: number): Promise<Builder> {
    // const builder = await this.builderRepo.findByPk(id);
    const builder = await this.builderRepo.findOne({
      where: { id },
      include: { all: true },
    });
    return builder;
  }

  //   async getBuilderByName(name: string): Promise<Builder> {
  //     // const builder = await this.builderRepo.findByPk(id);
  //     const builder = await this.builderRepo.findOne({ where: { name } });
  //     return builder;
  //   }
  async deleteBuilderById(id: number): Promise<number> {
    return this.builderRepo.destroy({ where: { id } });
  }

  //   async updateBuilder(id:number,updateBuilderDto:UpdateBuilderDto):Promise<Builder>{
  //     const builder =await this.builderRepo.update(updateBuilderDto,{where:{id},returning:true})
  //     return builder
  //   }
  async updateBuilder(
    id: number,
    updateBuilderDto: UpdateBuilderDto,
  ): Promise<[number, Builder[]]> {
    const [affectedCount, affectedRows] = await this.builderRepo.update(
      updateBuilderDto,
      {
        where: { id },
        returning: true,
      },
    );
    return [affectedCount, affectedRows];
  }
}

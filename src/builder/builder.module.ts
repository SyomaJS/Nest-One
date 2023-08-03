import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BuilderController } from './builder.controller';
import { BuilderService } from './builder.service';
import { Builder } from './models/builder.model';

@Module({
  imports:[SequelizeModule.forFeature([Builder])],
  controllers: [BuilderController],
  providers: [BuilderService]
})
export class BuilderModule {}

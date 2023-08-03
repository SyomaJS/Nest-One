import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BuilderService } from './builder.service';
import { createBuilderDto } from './dto/create-builder.dto';
import { UpdateBuilderDto } from './dto/update-builder.dto';
import { Builder } from './models/builder.model';

@ApiTags('Builder')
@Controller('builder')
export class BuilderController {
  constructor(private readonly builderService: BuilderService) {}

  @ApiOperation({ summary: "Builder qo'shish" })
  @Post('create')
  async createBuilder(
    @Body() createBuilderDto: createBuilderDto,
  ): Promise<Builder> {
    return this.builderService.createBuilder(createBuilderDto);
  }

  @ApiOperation({ summary: "Hamma builderlarni ko'rish" })
  @Get('all')
  async getAllBuilder(): Promise<Builder[]> {
    return this.builderService.getAllBuilder();
  }

  @ApiOperation({ summary: "Builderlarni ID bo'yicha ko'rish" })
  @Get(':id')
  async getBuilderById(@Param('id') id: string): Promise<Builder> {
    return this.builderService.getBuilderById(+id);
  }
  //   @Get(':name')
  //   async getBuilderByName(@Param('name') name: string): Promise<Builder> {
  //     return this.builderService.getBuilderByName(name);
  //   }

  @ApiOperation({ summary: "Builderlarni ID bo'yicha o'chirish" })
  @Delete(':id')
  async deleteBuilderById(@Param('id') id: string): Promise<number> {
    return this.builderService.deleteBuilderById(+id);
  }

  @ApiOperation({ summary: "Builderlarni ID bo'yicha yangilash" })
  @Put(':id')
  async updateBuilder(
    @Param('id') id: string,
    @Body() updateBuilderDto: UpdateBuilderDto,
  ): Promise<[number, Builder[]]> {
    return this.builderService.updateBuilder(+id, updateBuilderDto);
  }
}

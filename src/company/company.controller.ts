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
import { CompanyService } from './company.service';
import { createCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './models/company.model';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @ApiOperation({ summary: "Company qo'shish" })
  @Post('create')
  async createCompany(
    @Body() createCompanyDto: createCompanyDto,
  ): Promise<Company> {
    return this.companyService.createCompany(createCompanyDto);
  }

  @ApiOperation({ summary: "Companylarni ko'rish" })
  @Get('all')
  async getAllCompany(): Promise<Company[]> {
    return this.companyService.getAllCompany();
  }

  @ApiOperation({ summary: "Company ID bo'yicha ko'rish" })
  @Get(':id')
  async getCompanyById(@Param('id') id: string): Promise<Company> {
    return this.companyService.getCompanyById(+id);
  }
  @ApiOperation({ summary: "Company ID bo'yicha qo'shish" })
  @Get(':name')
  async getCompanyByName(@Param('name') name: string): Promise<Company> {
    return this.companyService.getCompanyByName(name);
  }
  @Delete(':id')
  async deleteCompanyById(@Param('id') id: string): Promise<number> {
    return this.companyService.deleteCompanyById(+id);
  }
  @Put(':id')
  async updateCompany(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ): Promise<[number, Company[]]> {
    return this.companyService.updateCompany(+id, updateCompanyDto);
  }
}

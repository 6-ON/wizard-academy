import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentService: DepartmentService) { }

  @Get()
  async getAllDepartments() {
    return this.departmentService.getAllDepartments();
  }

  @Get(':id')
  async getDepartmentById(@Param('id') id: number) {
    return this.departmentService.getDepartmentById(id);
  }

  @Post()
  async createDepartment(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.createDepartment(createDepartmentDto.name);
  }

  @Put(':id')
  async updateDepartment(@Param('id') id: number, @Body() updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentService.updateDepartment(id, updateDepartmentDto.name);
  }

  @Delete(':id')
  async deleteDepartment(@Param('id') id: number) {
    return this.departmentService.deleteDepartment(id);
  }
}

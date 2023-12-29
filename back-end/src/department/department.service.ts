import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './entity/department.entity';



@Injectable()
export class DepartmentService {

  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) { }

  // create department
  async createDepartment(name: string): Promise<Department> {
    const dep = new Department()
    dep.name = name
    const savedDepartment = await this.departmentRepository.save(dep);
    if (!savedDepartment) {
      throw new NotFoundException;
    }
    return savedDepartment;
  }


  // getAll departments
  async getAllDepartments(): Promise<Department[]> {
    return this.departmentRepository.find();
  }


  // get one dpartment
  async getDepartmentById(id: number): Promise<Department | undefined> {
    const department = await this.departmentRepository.findOne({ where: { id } });
    if (!department) {
      throw new NotFoundException;
    }
    return department;
  }


  // update department
  async updateDepartment(id: number, newName: string): Promise<Department | null> {
    const department = await this.departmentRepository.findOne({ where: { id } });
    if (!department) {
      throw new NotFoundException;
    }
    department.name = newName;
    return this.departmentRepository.save(department);
  }



  // delete dapartment
  async deleteDepartment(id: number): Promise<void> {
    await this.departmentRepository.delete(id);
  }

}


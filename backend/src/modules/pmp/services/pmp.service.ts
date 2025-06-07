import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PMP } from '../entities/pmp.entity';
import { CreatePmpDto } from '../dto/create-pmp.dto';
import { UpdatePmpDto } from '../dto/update-pmp.dto';

@Injectable()
export class PmpService {
  constructor(
    @InjectRepository(PMP)
    private readonly pmpRepository: Repository<PMP>,
  ) {}

  async create(createPmpDto: CreatePmpDto): Promise<PMP> {
    const pmp = this.pmpRepository.create(createPmpDto);
    return await this.pmpRepository.save(pmp);
  }

  async findAll(): Promise<PMP[]> {
    return await this.pmpRepository.find({
      relations: ['classroom', 'categories'],
    });
  }

  async findOne(id: string): Promise<PMP> {
    const pmp = await this.pmpRepository.findOne({
      where: { id },
      relations: ['classroom', 'categories', 'categories.questions'],
    });

    if (!pmp) {
      throw new NotFoundException(`PMP with ID "${id}" not found`);
    }

    return pmp;
  }

  async update(id: string, updatePmpDto: UpdatePmpDto): Promise<PMP> {
    const pmp = await this.findOne(id);
    Object.assign(pmp, updatePmpDto);
    return await this.pmpRepository.save(pmp);
  }

  async remove(id: string): Promise<void> {
    const result = await this.pmpRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`PMP with ID "${id}" not found`);
    }
  }

  async findByClassroom(classroomId: string): Promise<PMP[]> {
    return await this.pmpRepository.find({
      where: { classroomId },
      relations: ['categories'],
    });
  }
} 
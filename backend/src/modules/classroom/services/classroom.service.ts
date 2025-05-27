import {
  Injectable,
  Logger,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';

import { Classroom } from '../entities/classroom.entity';
import { CreateClassroomDto } from '../dto/classroom.dto';
import { UpdateClassroomDto } from '../dto/update-classroom.dto';

@Injectable()
export class ClassroomService {
  private readonly logger = new Logger(ClassroomService.name);

  constructor(
    @InjectRepository(Classroom)
    private readonly classroomRepo: Repository<Classroom>,
  ) {}

  async create(dto: CreateClassroomDto): Promise<Classroom> {
    try {
      const classroom = this.classroomRepo.create(dto);
      return await this.classroomRepo.save(classroom);
    } catch (err) {
      // MySQL duplicate entry → ER_DUP_ENTRY code 1062
      if (err instanceof QueryFailedError && (err as any).errno === 1062) {
        throw new ConflictException('Classroom already exists');
      }
      this.logger.error(`Create failed: ${err.message}`, err.stack);
      throw err;
    }
  }

  findAll(): Promise<Classroom[]> {
    return this.classroomRepo.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number): Promise<Classroom> {
    const classroom = await this.classroomRepo.findOne({ where: { id } });
    if (!classroom) throw new NotFoundException(`Classroom #${id} not found`);
    return classroom;
  }

  async update(id: number, dto: UpdateClassroomDto): Promise<Classroom> {
    const classroom = await this.findOne(id);
    Object.assign(classroom, dto);
    return this.classroomRepo.save(classroom);
  }

  async remove(id: number): Promise<void> {
    const result = await this.classroomRepo.delete(id);
    if (!result.affected)
      throw new NotFoundException(`Classroom #${id} not found`);
  }
}

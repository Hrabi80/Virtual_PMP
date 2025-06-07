import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionCategory } from '../entities/question-category.entity';
import { CreateQuestionCategoryDto } from '../dto/create-question-category.dto';
import { UpdateQuestionCategoryDto } from '../dto/update-question-category.dto';

@Injectable()
export class QuestionCategoryService {
  constructor(
    @InjectRepository(QuestionCategory)
    private readonly questionCategoryRepository: Repository<QuestionCategory>,
  ) {}

  async create(createQuestionCategoryDto: CreateQuestionCategoryDto): Promise<QuestionCategory> {
    const category = this.questionCategoryRepository.create(createQuestionCategoryDto);
    return await this.questionCategoryRepository.save(category);
  }

  async findAll(): Promise<QuestionCategory[]> {
    return await this.questionCategoryRepository.find({
      relations: ['pmp', 'questions'],
    });
  }

  async findOne(id: string): Promise<QuestionCategory> {
    const category = await this.questionCategoryRepository.findOne({
      where: { id },
      relations: ['pmp', 'questions'],
    });

    if (!category) {
      throw new NotFoundException(`Question Category with ID "${id}" not found`);
    }

    return category;
  }

  async update(id: string, updateQuestionCategoryDto: UpdateQuestionCategoryDto): Promise<QuestionCategory> {
    const category = await this.findOne(id);
    Object.assign(category, updateQuestionCategoryDto);
    return await this.questionCategoryRepository.save(category);
  }

  async remove(id: string): Promise<void> {
    const result = await this.questionCategoryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Question Category with ID "${id}" not found`);
    }
  }

  async findByPmp(pmpId: string): Promise<QuestionCategory[]> {
    return await this.questionCategoryRepository.find({
      where: { pmpId },
      relations: ['questions'],
    });
  }
} 
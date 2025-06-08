import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Question } from '../entities/question.entity';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { UpdateQuestionDto } from '../dto/update-question.dto';
import { QuestionCategory } from '../entities/question-category.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(QuestionCategory)
    private readonly questionCategoryRepository: Repository<QuestionCategory>,
  ) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const question = this.questionRepository.create({
      ...createQuestionDto,
      medicalPictureUrl: createQuestionDto.medicalPictureUrl || null,
    });
    return await this.questionRepository.save(question);
  }

  async findAll(): Promise<Question[]> {
    return await this.questionRepository.find({
      relations: ['category', 'linkedQuestions'],
    });
  }

  async findOne(id: string): Promise<Question> {
    const question = await this.questionRepository.findOne({
      where: { id },
      relations: ['category', 'linkedQuestions'],
    });

    if (!question) {
      throw new NotFoundException(`Question with ID "${id}" not found`);
    }

    return question;
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto): Promise<Question> {
    const question = await this.findOne(id);
    Object.assign(question, {
      ...updateQuestionDto,
      medicalPictureUrl: updateQuestionDto.medicalPictureUrl || null,
    });
    return await this.questionRepository.save(question);
  }

  async remove(id: string): Promise<void> {
    const result = await this.questionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Question with ID "${id}" not found`);
    }
  }

  async findByCategory(categoryId: string): Promise<Question[]> {
    return await this.questionRepository.find({
      where: { questionCategoryId: categoryId },
      relations: ['linkedQuestions'],
    });
  }

  async getAllQuestionsByPMP(pmpId: string): Promise<Question[]> {
    // First get all categories for this PMP
    const categories = await this.questionCategoryRepository.find({
      where: { pmpId },
      select: ['id'], // Only select the IDs as we don't need other fields
    });

    if (!categories.length) {
      return [];
    }

    // Get all questions for these categories
    const categoryIds = categories.map(cat => cat.id);
    return await this.questionRepository.find({
      where: { questionCategoryId: In(categoryIds) },
      relations: ['category', 'linkedQuestions'],
    });
  }

  async addLinkedQuestion(questionId: string, linkedQuestionId: string): Promise<Question> {
    const question = await this.findOne(questionId);
    const linkedQuestion = await this.findOne(linkedQuestionId);

    if (!question.linkedQuestions) {
      question.linkedQuestions = [];
    }

    question.linkedQuestions.push(linkedQuestion);
    return await this.questionRepository.save(question);
  }

  async removeLinkedQuestion(questionId: string, linkedQuestionId: string): Promise<Question> {
    const question = await this.findOne(questionId);
    question.linkedQuestions = question.linkedQuestions.filter(
      (q) => q.id !== linkedQuestionId,
    );
    return await this.questionRepository.save(question);
  }
}
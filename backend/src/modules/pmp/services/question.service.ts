import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../entities/question.entity';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { UpdateQuestionDto } from '../dto/update-question.dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const question = this.questionRepository.create(createQuestionDto);
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
    Object.assign(question, updateQuestionDto);
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
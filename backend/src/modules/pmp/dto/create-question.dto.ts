import {
  IsNotEmpty,
  IsString,
  IsUUID,
  IsNumber,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { QuestionType } from '../entities/question.entity';

export class CreateQuestionDto {
  @ApiProperty({
    description: 'The question text',
    example: 'What symptoms are you experiencing?',
  })
  @IsString()
  @IsNotEmpty()
  questionText: string;

  @ApiProperty({
    description: 'The type of question',
    enum: QuestionType,
    example: QuestionType.NORMAL_QUESTION,
  })
  @IsEnum(QuestionType)
  @IsNotEmpty()
  type: QuestionType;

  @ApiProperty({
    description: 'The response to the question',
    example: 'I have been experiencing severe headaches and dizziness.',
  })
  @IsString()
  @IsNotEmpty()
  response: string;

  @ApiProperty({
    description: 'URL to the medical picture (if applicable)',
    example: 'https://example.com/medical-image.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  medicalPictureUrl?: string;

  @ApiProperty({
    description: 'The base score for this question',
    example: 5.0,
  })
  @IsNumber()
  @IsNotEmpty()
  score: number;

  @ApiProperty({
    description: 'The ID of the question category this question belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  questionCategoryId: string;
}

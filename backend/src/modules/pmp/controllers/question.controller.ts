import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { QuestionService } from '../services/question.service';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { UpdateQuestionDto } from '../dto/update-question.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { Question } from '../entities/question.entity';

@ApiTags('Questions')
@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new question' })
  @ApiResponse({
    status: 201,
    description: 'The question has been successfully created.',
    type: Question,
  })
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto);
  }

  @Get('pmp/:pmpId')
  @ApiOperation({ summary: 'Get all questions for a PMP' })
  @ApiParam({
    name: 'pmpId',
    description: 'The ID of the PMP',
  })
  @ApiResponse({
    status: 200,
    description: 'List of questions for the PMP',
    type: [Question],
  })
  getAllQuestionsByPMP(@Param('pmpId') pmpId: string) {
    return this.questionService.getAllQuestionsByPMP(pmpId);
  } 

  @Get(':categoryId')
  @ApiOperation({ summary: 'Get all questions for a category' })
  @ApiParam({
    name: 'categoryId',
    description: 'The ID of the category',
  })
  @ApiResponse({
    status: 200,
    description: 'List of questions',
    type: [Question],
  })
  findByCategory(@Param('categoryId') categoryId: string) {
    return this.questionService.findByCategory(categoryId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all questions' })
  @ApiResponse({
    status: 200,
    description: 'List of all questions',
    type: [Question],
  })
  findAll() {
    return this.questionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a question by id' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the question',
  })
  @ApiResponse({
    status: 200,
    description: 'The found question',
    type: Question,
  })
  @ApiResponse({
    status: 404,
    description: 'Question not found',
  })
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a question' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the question to update',
  })
  @ApiResponse({
    status: 200,
    description: 'The question has been successfully updated.',
    type: Question,
  })
  @ApiResponse({
    status: 404,
    description: 'Question not found',
  })
  update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a question' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the question to delete',
  })
  @ApiResponse({
    status: 200,
    description: 'The question has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Question not found',
  })
  remove(@Param('id') id: string) {
    return this.questionService.remove(id);
  }

  @Post(':id/linked-questions/:linkedId')
  @ApiOperation({ summary: 'Add a linked question' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the source question',
  })
  @ApiParam({
    name: 'linkedId',
    description: 'The ID of the question to link',
  })
  @ApiResponse({
    status: 200,
    description: 'The question has been successfully linked.',
    type: Question,
  })
  addLinkedQuestion(
    @Param('id') id: string,
    @Param('linkedId') linkedId: string,
  ) {
    return this.questionService.addLinkedQuestion(id, linkedId);
  }

  @Delete(':id/linked-questions/:linkedId')
  @ApiOperation({ summary: 'Remove a linked question' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the source question',
  })
  @ApiParam({
    name: 'linkedId',
    description: 'The ID of the question to unlink',
  })
  @ApiResponse({
    status: 200,
    description: 'The question has been successfully unlinked.',
    type: Question,
  })
  removeLinkedQuestion(
    @Param('id') id: string,
    @Param('linkedId') linkedId: string,
  ) {
    return this.questionService.removeLinkedQuestion(id, linkedId);
  }
}

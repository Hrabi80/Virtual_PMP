import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { QuestionCategoryService } from '../services/question-category.service';
import { CreateQuestionCategoryDto } from '../dto/create-question-category.dto';
import { UpdateQuestionCategoryDto } from '../dto/update-question-category.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { QuestionCategory } from '../entities/question-category.entity';

@ApiTags('Question Categories')
@Controller('question-categories')
export class QuestionCategoryController {
  constructor(
    private readonly questionCategoryService: QuestionCategoryService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new question category' })
  @ApiResponse({
    status: 201,
    description: 'The question category has been successfully created.',
    type: QuestionCategory,
  })
  create(@Body() createQuestionCategoryDto: CreateQuestionCategoryDto) {
    return this.questionCategoryService.create(createQuestionCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all question categories or filter by PMP' })
  @ApiQuery({
    name: 'pmpId',
    required: false,
    description: 'Filter categories by PMP ID',
  })
  @ApiResponse({
    status: 200,
    description: 'List of question categories',
    type: [QuestionCategory],
  })
  findAll(@Query('pmpId') pmpId?: string) {
    if (pmpId) {
      return this.questionCategoryService.findByPmp(pmpId);
    }
    return this.questionCategoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a question category by id' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the question category',
  })
  @ApiResponse({
    status: 200,
    description: 'The found question category',
    type: QuestionCategory,
  })
  @ApiResponse({
    status: 404,
    description: 'Question category not found',
  })
  findOne(@Param('id') id: string) {
    return this.questionCategoryService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a question category' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the question category to update',
  })
  @ApiResponse({
    status: 200,
    description: 'The question category has been successfully updated.',
    type: QuestionCategory,
  })
  @ApiResponse({
    status: 404,
    description: 'Question category not found',
  })
  update(
    @Param('id') id: string,
    @Body() updateQuestionCategoryDto: UpdateQuestionCategoryDto,
  ) {
    return this.questionCategoryService.update(id, updateQuestionCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a question category' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the question category to delete',
  })
  @ApiResponse({
    status: 200,
    description: 'The question category has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Question category not found',
  })
  remove(@Param('id') id: string) {
    return this.questionCategoryService.remove(id);
  }
}

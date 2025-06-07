// src/classrooms/classrooms.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

import { ClassroomService } from '../services/classroom.service';
import { CreateClassroomDto } from '../dto/classroom.dto';
import { UpdateClassroomDto } from '../dto/update-classroom.dto';
import { Classroom } from '../entities/classroom.entity';

@ApiTags('classrooms')
@Controller('classrooms')
export class ClassroomController {
  constructor(private readonly service: ClassroomService) {}

  @Post()
  @ApiOperation({ summary: 'Create classroom' })
  @ApiResponse({ status: 201, type: Classroom })
  async create(@Body() dto: CreateClassroomDto): Promise<Classroom> {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List classrooms' })
  @ApiResponse({ status: 200, type: [Classroom] })
  findAll(): Promise<Classroom[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get classroom by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: Classroom })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Classroom> {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update classroom' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: Classroom })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateClassroomDto,
  ): Promise<Classroom> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete classroom' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204, description: 'Deleted' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }
}

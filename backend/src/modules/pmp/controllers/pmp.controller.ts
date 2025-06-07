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
import { PmpService } from '../services/pmp.service';
import { CreatePmpDto } from '../dto/create-pmp.dto';
import { UpdatePmpDto } from '../dto/update-pmp.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { PMP } from '../entities/pmp.entity';

@ApiTags('PMP')
@Controller('pmp')
export class PmpController {
  constructor(private readonly pmpService: PmpService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new PMP' })
  @ApiResponse({
    status: 201,
    description: 'The PMP has been successfully created.',
    type: PMP,
  })
  create(@Body() createPmpDto: CreatePmpDto) {
    return this.pmpService.create(createPmpDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all PMPs or filter by classroom' })
  @ApiQuery({
    name: 'classroomId',
    required: false,
    description: 'Filter PMPs by classroom ID',
  })
  @ApiResponse({
    status: 200,
    description: 'List of PMPs',
    type: [PMP],
  })
  findAll(@Query('classroomId') classroomId?: string) {
    if (classroomId) {
      return this.pmpService.findByClassroom(classroomId);
    }
    return this.pmpService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a PMP by id' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the PMP',
  })
  @ApiResponse({
    status: 200,
    description: 'The found PMP',
    type: PMP,
  })
  @ApiResponse({
    status: 404,
    description: 'PMP not found',
  })
  findOne(@Param('id') id: string) {
    return this.pmpService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a PMP' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the PMP to update',
  })
  @ApiResponse({
    status: 200,
    description: 'The PMP has been successfully updated.',
    type: PMP,
  })
  @ApiResponse({
    status: 404,
    description: 'PMP not found',
  })
  update(@Param('id') id: string, @Body() updatePmpDto: UpdatePmpDto) {
    return this.pmpService.update(id, updatePmpDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a PMP' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the PMP to delete',
  })
  @ApiResponse({
    status: 200,
    description: 'The PMP has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'PMP not found',
  })
  remove(@Param('id') id: string) {
    return this.pmpService.remove(id);
  }
} 
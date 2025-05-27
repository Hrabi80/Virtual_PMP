// src/classrooms/dto/create-classroom.dto.ts
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClassroomDto {
  @ApiProperty({
    description: 'The name of the classroom',
    example: 'Algebra 101',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The grade year',
    example: 10,
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  grade: number;

  @ApiProperty({
    description: 'The major or subject focus',
    example: 'Mathematics',
  })
  @IsString()
  @IsNotEmpty()
  major: string;

  @ApiProperty({
    description: 'Additional classroom details',
    example: 'Room with projector and smart board',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}

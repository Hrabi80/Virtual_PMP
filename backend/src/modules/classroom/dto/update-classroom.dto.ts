// src/classrooms/dto/update-classroom.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateClassroomDto } from './classroom.dto';

export class UpdateClassroomDto extends PartialType(CreateClassroomDto) {}

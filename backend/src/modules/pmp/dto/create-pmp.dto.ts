import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePmpDto {
  @ApiProperty({
    description: 'The title of the PMP',
    example: 'Diabetes Type 2 Case Study',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The description of the PMP',
    example: 'A case study about managing a patient with Type 2 Diabetes',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'The initial patient scenario',
    example:
      'A 45-year-old male presents with increased thirst and frequent urination...',
  })
  @IsString()
  @IsNotEmpty()
  annonceOfTheProblem: string;

  @ApiProperty({
    description: 'The ID of the classroom this PMP belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  classroomId: string;
}

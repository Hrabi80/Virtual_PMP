import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PmpService } from './services/pmp.service';
import { PmpController } from './controllers/pmp.controller';
import { QuestionCategoryService } from './services/question-category.service';
import { QuestionCategoryController } from './controllers/question-category.controller';
import { QuestionService } from './services/question.service';
import { QuestionController } from './controllers/question.controller';
import { PMP } from './entities/pmp.entity';
import { QuestionCategory } from './entities/question-category.entity';
import { Question } from './entities/question.entity';
import { QuestionBonusLink } from './entities/question-bonus-link.entity';
import { ClassroomModule } from '../classroom/classroom.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PMP,
      ClassroomModule,
      QuestionCategory,
      Question,
      QuestionBonusLink,
    ]),
  ],
  controllers: [PmpController, QuestionCategoryController, QuestionController],
  providers: [PmpService, QuestionCategoryService, QuestionService],
  exports: [PmpService, QuestionCategoryService, QuestionService],
})
export class PmpModule {}

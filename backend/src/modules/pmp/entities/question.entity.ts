import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { QuestionCategory } from './question-category.entity';

export enum QuestionType {
  NORMAL_QUESTION = 'NORMAL_QUESTION',
  ASK_FOR_MEDICAL_PICTURE = 'ASK_FOR_MEDICAL_PICTURE',
}

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  questionText: string;

  @Column({
    type: 'enum',
    enum: QuestionType,
    default: QuestionType.NORMAL_QUESTION,
  })
  type: QuestionType;

  @Column('text')
  response: string;

  @Column({ nullable: true })
  medicalPictureUrl: string;

  @Column('float')
  score: number;

  @Column()
  questionCategoryId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => QuestionCategory, (category) => category.questions)
  category: QuestionCategory;

  @ManyToMany(() => Question)
  @JoinTable({
    name: 'question_bonus_links',
    joinColumn: {
      name: 'sourceQuestionId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'targetQuestionId',
      referencedColumnName: 'id',
    },
  })
  linkedQuestions: Question[];
}

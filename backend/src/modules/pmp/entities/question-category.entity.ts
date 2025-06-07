import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PMP } from './pmp.entity';
import { Question } from './question.entity';

@Entity('question_categories')
export class QuestionCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  pmpId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => PMP, (pmp) => pmp.categories, { onDelete: 'CASCADE' })
  pmp: PMP;

  @OneToMany(() => Question, (question) => question.category)
  questions: Question[];
}

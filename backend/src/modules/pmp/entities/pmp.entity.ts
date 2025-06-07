import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Classroom } from 'src/modules/classroom/entities/classroom.entity';
import { QuestionCategory } from './question-category.entity';

@Entity('pmps')
export class PMP {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('text')
  annonceOfTheProblem: string;

  @Column({ nullable: true })
  professorId: string;

  @Column()
  classroomId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Classroom, (classroom) => classroom.pmps)
  classroom: Classroom;

  @OneToMany(() => QuestionCategory, (category) => category.pmp, {
    cascade: ['remove'],
    onDelete: 'CASCADE',
  })
  categories: QuestionCategory[];
}

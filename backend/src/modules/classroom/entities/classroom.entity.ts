import { PMP } from 'src/modules/pmp/entities/pmp.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('classrooms')
export class Classroom extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  grade: number;

  @Column()
  major: string;

  @Column({ nullable: true })
  description?: string;
  @OneToMany(() => PMP, (pmp) => pmp.classroom)
  pmps: PMP[];
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum BonusType {
  LINKED_TO_PREVIOUS_RESPONSE = 'LINKED_TO_PREVIOUS_RESPONSE',
  LINKED_TO_NEXT_RESPONSE = 'LINKED_TO_NEXT_RESPONSE',
  RELATED_TO_TOPIC = 'RELATED_TO_TOPIC',
}

@Entity('question_bonus_links')
export class QuestionBonusLink {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sourceQuestionId: string;

  @Column()
  targetQuestionId: string;

  @Column({
    type: 'enum',
    enum: BonusType,
    default: BonusType.RELATED_TO_TOPIC,
  })
  bonusType: BonusType;

  @Column('float')
  bonusValue: number;
}

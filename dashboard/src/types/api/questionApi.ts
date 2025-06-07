
export enum QuestionType {
  NORMAL_QUESTION = "NORMAL_QUESTION",
  ASK_FOR_MEDICAL_PICTURE = "ASK_FOR_MEDICAL_PICTURE",
}
export enum BonusType {
  LINKED_TO_PREVIOUS_RESPONSE = "LINKED_TO_PREVIOUS_RESPONSE",
  LINKED_TO_NEXT_RESPONSE = "LINKED_TO_NEXT_RESPONSE",
  RELATED_TO_TOPIC = "RELATED_TO_TOPIC",
}

export interface Question {
  id: string;
  questionText: string;
  type: QuestionType;
  response: string;
  medicalPictureUrl?: string;
  score: number;
  questionCategoryId: string;
  createdAt: string;
  updatedAt: string;
  linkedQuestions?: Question[];
}

export interface CreateQuestionRequest {
  questionText: string;
  type: QuestionType;
  response: string;
  medicalPictureUrl?: string;
  score: number;
  questionCategoryId: string;
}

export type UpdateQuestionRequest = Partial<CreateQuestionRequest>;

export interface QuestionBonusLink {
  id: string;
  sourceQuestionId: string;
  targetQuestionId: string;
  bonusType: BonusType;
  bonusValue: number;
}

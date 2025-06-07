import { PMP } from "./pmpApi";
import { Question } from "./questionApi";


export interface QuestionCategory {
  id: string;
  name: string;
  pmpId: string;
  createdAt: string;
  updatedAt: string;
  pmp?: PMP;
  questions?: Question[];
}

export interface CreateQuestionCategoryRequest {
  name: string;
  pmpId: string;
}

export type UpdateQuestionCategoryRequest =
  Partial<CreateQuestionCategoryRequest>;



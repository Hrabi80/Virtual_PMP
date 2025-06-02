import { Question } from "./questionApi";

export interface Category {
  id: string;
  name: string;
  pmpId: string;
  questions: Question[];
}
export interface CreateCategoryRequest {
  name: string;
  pmpId: string;
}

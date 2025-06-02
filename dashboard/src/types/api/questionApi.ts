export interface Question {
  id: string;
  questionText: string;
  type: "NORMAL_QUESTION" | "ASK_FOR_MEDICAL_PICTURE";
  response: string;
  medicalPictureUrl?: string;
  score: number;
  questionCategoryId: string;
  createdAt: string;
}
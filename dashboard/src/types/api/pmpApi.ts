import { QuestionCategory } from "./categoryApi";
import { Classroom } from "./classroomApi";

export interface PMP {
  id: string;
  title: string;
  description: string;
  annonceOfTheProblem: string;
  professorId: string | null;
  classroomId: string;
  createdAt: string;
  updatedAt: string;
  classroom?: Classroom;
  categories?: QuestionCategory[];
}

export interface CreatePMPRequest {
  title: string;
  description: string;
  annonceOfTheProblem: string;
  classroomId: string;
}

export type UpdatePMPRequest = Partial<CreatePMPRequest>;

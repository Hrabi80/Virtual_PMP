
export interface Classroom {
  id: string;
  name: string;
  major: string;
  description: string;
  imageUrl: string;
  studentCount: number;
}

export interface PMP {
  id: string;
  title: string;
  description: string;
  annonceOfTheProblem: string;
  professorName: string;
  imageUrl: string;
  classroomId: string;
  difficulty: string;
  maxScore: number;
}

export interface QuestionCategory {
  id: string;
  name: string;
  pmpId: string;
}

export interface Question {
  id: string;
  questionText: string;
  type: 'NORMAL_QUESTION' | 'ASK_FOR_MEDICAL_PICTURE';
  response: string;
  medicalPictureUrl?: string;
  score: number;
  questionCategoryId: string;
}

export interface AskedQuestion {
  question: Question;
  askedAt: Date;
}

export interface ConsultationState {
  selectedPMP: PMP | null;
  selectedCategory: QuestionCategory | null;
  askedQuestions: AskedQuestion[];
  currentScore: number;
  medicalImages: string[];
}

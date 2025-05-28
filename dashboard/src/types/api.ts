
export interface Classroom {
  id: string
  name: string
  major: string
  grade: number
  description: string
  createdAt: string
}

export interface PMP {
  id: string
  title: string
  description: string
  annonceOfTheProblem: string
  professorName: string
  classroomName: string
  createdBy: string
  createdAt: string
  isVisible?: boolean
}

export interface Category {
  id: string
  name: string
  pmpId: string
  questions: Question[]
}

export interface Question {
  id: string
  questionText: string
  type: "NORMAL_QUESTION" | "ASK_FOR_MEDICAL_PICTURE"
  response: string
  medicalPictureUrl?: string
  score: number
  questionCategoryId: string
  createdAt: string
}

export interface CreateClassroomRequest {
  name: string
  major: string
  grade: number
  description: string
}

export interface CreatePMPRequest {
  title: string
  description: string
  annonceOfTheProblem: string
  classroomName: string
  createdBy: string
  isVisible?: boolean
}

export interface UpdatePMPRequest extends Partial<CreatePMPRequest> {
  id: string
}

export interface CreateCategoryRequest {
  name: string
  pmpId: string
}

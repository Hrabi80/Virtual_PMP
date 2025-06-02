export interface PMP {
  id: string;
  title: string;
  description: string;
  annonceOfTheProblem: string;
  professorName: string;
  classroomName: string;
  createdBy: string;
  createdAt: string;
  isVisible?: boolean;
}

export interface CreatePMPRequest {
  title: string;
  description: string;
  annonceOfTheProblem: string;
  classroomName: string;
  createdBy: string;
  isVisible?: boolean;
}

export interface UpdatePMPRequest extends Partial<CreatePMPRequest> {
  id: string;
}

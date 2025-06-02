export interface Classroom {
  id: string
  name: string
  major: string
  grade: number
  description: string
  createdAt: string
}

export interface CreateClassroomRequest {
  name: string
  major: string
  grade: number
  description: string
}

export interface UpdateClassroomRequest extends Partial<CreateClassroomRequest> {
  id: string
}
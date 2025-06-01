import { apiClient } from '../client';
import { createApiUrl } from '../config';

import { Classroom, CreateClassroomRequest, UpdateClassroomRequest } from '../../../types/api';

export const fetchClassrooms = async (): Promise<Classroom[]> => {
    const url = createApiUrl('classrooms');
    return apiClient.get<Classroom[]>(url);
};

export const createClassroom = async (payload: CreateClassroomRequest): Promise<Classroom> => {
    const url = createApiUrl('classrooms');
    return apiClient.post<Classroom>(url, payload);
};


export const updateClassroom = async (
  payload: UpdateClassroomRequest
): Promise<Classroom> => {
  const { id, ...data } = payload
  const url = createApiUrl('classrooms', id)
  return apiClient.put<Classroom>(url, data)
}


export const deleteClassroom = async (id: string): Promise<void> => {
  const url = createApiUrl('classrooms', id)
  return apiClient.delete<void>(url)
}




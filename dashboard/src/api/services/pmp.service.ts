import { api } from '@/lib/api';
import { CreatePMPRequest, PMP, UpdatePMPRequest } from "@/types/api";

export const PMPService = {
  // PMP Management
  getAllPMPs: async (): Promise<PMP[]> => {
    const { data } = await api.get<PMP[]>('/pmp');
    return data;
  },

  getPMPsByClassroom: async (classroomId: string): Promise<PMP[]> => {
    const { data } = await api.get<PMP[]>(`/classrooms/${classroomId}/pmp`);
    return data;
  },

  getPMP: async (id: string): Promise<PMP> => {
    const { data } = await api.get<PMP>(`/pmp/${id}`);
    return data;
  },

  createPMP: async (data: CreatePMPRequest): Promise<PMP> => {
    const { data: responseData } = await api.post<PMP>('/pmp', data);
    return responseData;
  },

  updatePMP: async (id: string, data: UpdatePMPRequest): Promise<PMP> => {
    const { data: responseData } = await api.patch<PMP>(`/pmp/${id}`, data);
    return responseData;
  },

  deletePMP: async (id: string): Promise<void> => {
    await api.delete(`/pmp/${id}`);
  },
};

import {
  CreateQuestionRequest,
  Question,
  QuestionBonusLink,
  UpdateQuestionRequest,
} from "@/types/api";
import { apiClient } from "../client";
import { createApiUrl } from "../config";
import { api } from '@/lib/api';

const BASE_URL = createApiUrl("pmp");

interface Filelike {
  type: string;
}

function isFile(value: any): value is Filelike {
  return value && typeof value === 'object' && 'type' in value;
}

export const QuestionService = {
  // Question Management
  getQuestionsByCategory: async (categoryId: string): Promise<Question[]> => {
    const { data } = await api.get<Question[]>(`/questions/${categoryId}`);
    return data;
  },

  getAllQuestions: async (): Promise<Question[]> => {
    const { data } = await api.get<Question[]>('/questions');
    return data;
  },

  getAllQuestionsByPMP: async (pmpId: string): Promise<Question[]> => {
    const { data } = await api.get<Question[]>(`/questions/pmp/${pmpId}`);
    return data;
  },

  getQuestion: async (id: string): Promise<Question> => {
    const { data } = await api.get<Question>(`/questions/${id}`);
    return data;
  },

  createQuestion: async (categoryId: string, data: CreateQuestionRequest): Promise<Question> => {
    const { data: responseData } = await api.post<Question>(`/questions`, {
      ...data,
      questionCategoryId: categoryId
    });
    return responseData;
  },

  updateQuestion: async (id: string, data: UpdateQuestionRequest): Promise<Question> => {
    const { data: responseData } = await api.patch<Question>(`/questions/${id}`, data);
    return responseData;
  },

  deleteQuestion: async (id: string): Promise<void> => {
    await api.delete(`/questions/${id}`);
  },

  // Bonus Links Management
  createBonusLink: async (sourceId: string, targetId: string, bonusType: string, bonusValue: number): Promise<void> => {
    await api.post(`/questions/${sourceId}/bonus-links`, {
      targetQuestionId: targetId,
      bonusType,
      bonusValue,
    });
  },

  deleteBonusLink: async (sourceId: string, targetId: string): Promise<void> => {
    await api.delete(`/questions/${sourceId}/bonus-links/${targetId}`);
  },

  async getBonusLinks(pmpId: string): Promise<QuestionBonusLink[]> {
    return apiClient.get<QuestionBonusLink[]>(
      `${BASE_URL}/${pmpId}/bonus-links`
    );
  },
};

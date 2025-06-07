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

const isFile = (value: unknown): value is File => {
  return value instanceof File || (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    typeof (value as Filelike).type === 'string'
  );
};

export const QuestionService = {
  // Question Management
  getQuestionsByCategory: async (categoryId: string): Promise<Question[]> => {
    const { data } = await api.get<Question[]>(`/categories/${categoryId}/questions`);
    return data;
  },

  getAllQuestions: async (): Promise<Question[]> => {
    const { data } = await api.get<Question[]>('/questions');
    return data;
  },

  getQuestion: async (id: string): Promise<Question> => {
    const { data } = await api.get<Question>(`/questions/${id}`);
    return data;
  },

  createQuestion: async (categoryId: string, data: CreateQuestionRequest): Promise<Question> => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'medicalPictureFile' && isFile(value)) {
      formData.append('medicalPicture', value);
      } else if (value !== undefined && value !== null) {
      formData.append(key, String(value));
      }
    });
    formData.append('questionCategoryId', categoryId);

    const { data: responseData } = await api.post<Question>(`/questions`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return responseData;
  },

  updateQuestion: async (id: string, data: UpdateQuestionRequest): Promise<Question> => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'medicalPictureFile' && isFile(value)) {
        formData.append('medicalPicture', value);
      } else if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    const { data: responseData } = await api.patch<Question>(`/questions/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
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

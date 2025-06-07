import {
  CreateQuestionCategoryRequest,
  Question,
  QuestionCategory,
} from "@/types/api";
import { apiClient } from "../client";
import { createApiUrl } from "../config";
import { api } from "@/lib/api";

const CATEGORIES_URL = createApiUrl("question-categories");

export const CategoryService = {
  async getCategories(pmpId: string): Promise<QuestionCategory[]> {
    return apiClient.get<QuestionCategory[]>(
      `${CATEGORIES_URL}?pmpId=${pmpId}`
    );
  },

  async createCategory(
    pmpId: string,
    data: CreateQuestionCategoryRequest
  ): Promise<QuestionCategory> {
    return apiClient.post<QuestionCategory>(CATEGORIES_URL, { ...data, pmpId });
  },

  async updateCategory(
    pmpId: string,
    categoryId: string,
    data: Partial<CreateQuestionCategoryRequest>
  ): Promise<QuestionCategory> {
    return apiClient.put<QuestionCategory>(`${CATEGORIES_URL}/${categoryId}`, {
      ...data,
      pmpId,
    });
  },

  async deleteCategory(pmpId: string, categoryId: string): Promise<void> {
    return apiClient.delete(`${CATEGORIES_URL}/${categoryId}`);
  },

  // Question Management
  getQuestionsByCategory: async (categoryId: string): Promise<Question[]> => {
    const { data } = await api.get<Question[]>(
      `/categories/${categoryId}/questions`
    );
    return data;
  },
};

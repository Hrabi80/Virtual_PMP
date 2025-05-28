
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api/client'
import { API_CONFIG, createApiUrl } from '@/lib/api/config'
import type { Category, CreateCategoryRequest } from '@/types/api'

const QUERY_KEYS = {
  categories: ['categories'] as const,
  category: (id: string) => ['categories', id] as const,
  pmpCategories: (pmpId: string) => ['categories', 'pmp', pmpId] as const,
}

export const usePMPCategories = (pmpId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.pmpCategories(pmpId),
    queryFn: async (): Promise<Category[]> => {
      // TODO: Uncomment when API is ready
      // return apiClient.get<Category[]>(`${API_CONFIG.endpoints.categories}?pmpId=${pmpId}`)
      
      // Mock data for now
      if (pmpId === "1") {
        return [
          {
            id: "cat1",
            name: "Initial Assessment",
            pmpId: "1",
            questions: [
              {
                id: "q1",
                questionText: "What brings you to the clinic today?",
                type: "NORMAL_QUESTION",
                response: "I've been having chest pain for the past week.",
                score: 10,
                questionCategoryId: "cat1",
                createdAt: "2024-01-15"
              }
            ]
          }
        ]
      }
      return []
    },
    enabled: !!pmpId,
  })
}

export const useCreateCategory = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (data: CreateCategoryRequest): Promise<Category> => {
      // TODO: Uncomment when API is ready
      // return apiClient.post<Category>(API_CONFIG.endpoints.categories, data)
      
      // Mock response for now
      console.log('Creating category:', data)
      return {
        id: Date.now().toString(),
        ...data,
        questions: [],
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.pmpCategories(data.pmpId) })
    },
  })
}

export const useUpdateCategory = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ id, ...data }: Partial<Category> & { id: string }): Promise<Category> => {
      // TODO: Uncomment when API is ready
      // return apiClient.put<Category>(createApiUrl(API_CONFIG.endpoints.categories, id), data)
      
      // Mock response for now
      console.log('Updating category:', { id, ...data })
      return { id, ...data } as Category
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.categories })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.category(data.id) })
      if (data.pmpId) {
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.pmpCategories(data.pmpId) })
      }
    },
  })
}

export const useDeleteCategory = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      // TODO: Uncomment when API is ready
      // return apiClient.delete(createApiUrl(API_CONFIG.endpoints.categories, id))
      
      // Mock response for now
      console.log('Deleting category:', id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.categories })
    },
  })
}


import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api/client'
import { API_CONFIG, createApiUrl } from '@/lib/api/config'
import type { Classroom, CreateClassroomRequest } from '@/types/api'

const QUERY_KEYS = {
  classrooms: ['classrooms'] as const,
  classroom: (id: string) => ['classrooms', id] as const,
}

export const useClassrooms = () => {
  return useQuery({
    queryKey: QUERY_KEYS.classrooms,
    queryFn: async (): Promise<Classroom[]> => {
      // TODO: Uncomment when API is ready
      // return apiClient.get<Classroom[]>(API_CONFIG.endpoints.classrooms)
      
      // Mock data for now
      return [
        {
          id: "1",
          name: "Medical Students - Year 3",
          major: "Medicine",
          grade: 3,
          description: "Third year medical students focusing on clinical rotations",
          createdAt: "2024-01-15"
        },
        {
          id: "2", 
          name: "Medical Students - Year 4",
          major: "Medicine",
          grade: 4,
          description: "Fourth year medical students preparing for residency",
          createdAt: "2024-01-10"
        }
      ]
    },
  })
}

export const useCreateClassroom = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (data: CreateClassroomRequest): Promise<Classroom> => {
      // TODO: Uncomment when API is ready
      // return apiClient.post<Classroom>(API_CONFIG.endpoints.classrooms, data)
      
      // Mock response for now
      console.log('Creating classroom:', data)
      return {
        id: Date.now().toString(),
        ...data,
        createdAt: new Date().toISOString(),
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.classrooms })
    },
  })
}

export const useUpdateClassroom = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ id, ...data }: Partial<Classroom> & { id: string }): Promise<Classroom> => {
      // TODO: Uncomment when API is ready
      // return apiClient.put<Classroom>(createApiUrl(API_CONFIG.endpoints.classrooms, id), data)
      
      // Mock response for now
      console.log('Updating classroom:', { id, ...data })
      return { id, ...data } as Classroom
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.classrooms })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.classroom(data.id) })
    },
  })
}

export const useDeleteClassroom = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      // TODO: Uncomment when API is ready
      // return apiClient.delete(createApiUrl(API_CONFIG.endpoints.classrooms, id))
      
      // Mock response for now
      console.log('Deleting classroom:', id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.classrooms })
    },
  })
}


import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api/client'
import { API_CONFIG, createApiUrl } from '@/lib/api/config'
import type { PMP, CreatePMPRequest, UpdatePMPRequest } from '@/types/api'

const QUERY_KEYS = {
  pmps: ['pmps'] as const,
  pmp: (id: string) => ['pmps', id] as const,
  myPmps: (professorId: string) => ['pmps', 'professor', professorId] as const,
}

export const usePMPs = () => {
  return useQuery({
    queryKey: QUERY_KEYS.pmps,
    queryFn: async (): Promise<PMP[]> => {
      // TODO: Uncomment when API is ready
      // return apiClient.get<PMP[]>(API_CONFIG.endpoints.pmps)
      
      // Mock data for now
      return [
        {
          id: "1",
          title: "Cardiovascular Assessment",
          description: "Interactive case study on heart disease diagnosis",
          annonceOfTheProblem: "Patient presents with chest pain and shortness of breath",
          professorName: "Dr. Smith",
          classroomName: "Medical Students - Year 3",
          createdBy: "prof1",
          createdAt: "2024-01-15",
          isVisible: false
        },
        {
          id: "2",
          title: "Neurological Examination",
          description: "Virtual patient with neurological symptoms",
          annonceOfTheProblem: "Patient shows signs of memory loss and confusion",
          professorName: "Dr. Johnson",
          classroomName: "Medical Students - Year 4",
          createdBy: "prof2",
          createdAt: "2024-01-10",
          isVisible: false
        }
      ]
    },
  })
}

export const usePMP = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.pmp(id),
    queryFn: async (): Promise<PMP> => {
      // TODO: Uncomment when API is ready
      // return apiClient.get<PMP>(createApiUrl(API_CONFIG.endpoints.pmps, id))
      
      // Mock data for now
      return {
        id: "1",
        title: "Cardiovascular Assessment",
        description: "Interactive case study on heart disease diagnosis with comprehensive patient evaluation and diagnostic procedures.",
        annonceOfTheProblem: "Patient presents with chest pain and shortness of breath",
        professorName: "Dr. Smith",
        classroomName: "Medical Students - Year 3",
        createdBy: "prof1",
        createdAt: "2024-01-15",
        isVisible: false
      }
    },
    enabled: !!id,
  })
}

export const useCreatePMP = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (data: CreatePMPRequest): Promise<PMP> => {
      // TODO: Uncomment when API is ready
      // return apiClient.post<PMP>(API_CONFIG.endpoints.pmps, data)
      
      // Mock response for now
      console.log('Creating PMP:', data)
      return {
        id: Date.now().toString(),
        ...data,
        professorName: "Dr. Smith", // This would come from auth context
        createdAt: new Date().toISOString(),
        isVisible: data.isVisible ?? false,
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.pmps })
    },
  })
}

export const useUpdatePMP = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ id, ...data }: UpdatePMPRequest): Promise<PMP> => {
      // TODO: Uncomment when API is ready
      // return apiClient.put<PMP>(createApiUrl(API_CONFIG.endpoints.pmps, id), data)
      
      // Mock response for now
      console.log('Updating PMP:', { id, ...data })
      return { id, ...data } as PMP
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.pmps })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.pmp(data.id) })
    },
  })
}

export const useDeletePMP = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      // TODO: Uncomment when API is ready
      // return apiClient.delete(createApiUrl(API_CONFIG.endpoints.pmps, id))
      
      // Mock response for now
      console.log('Deleting PMP:', id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.pmps })
    },
  })
}

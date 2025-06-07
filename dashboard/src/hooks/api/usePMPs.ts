import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PMPService } from '@/api/services/pmp.service';
import { toast } from 'sonner';
import { CreatePMPRequest, UpdatePMPRequest } from '@/types/api';

export const usePMPs = (classroomId?: string) => {
  const queryClient = useQueryClient();

  const { data: pmps, isLoading } = useQuery({
    queryKey: ['pmps', classroomId],
    queryFn: () => classroomId ? PMPService.getPMPsByClassroom(classroomId) : PMPService.getAllPMPs(),
  });

  const useGetPMPById = (id: string) => useQuery({
    queryKey: ['pmp', id],
    queryFn: () => PMPService.getPMP(id),
    enabled: !!id,
  });

  const createPMP = useMutation({
    mutationFn: (data: CreatePMPRequest) => PMPService.createPMP(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pmps'] });
      toast.success('PMP created successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to create PMP: ${error.message}`);
    },
  });

  const updatePMP = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePMPRequest }) => PMPService.updatePMP(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pmps'] });
      toast.success('PMP updated successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update PMP: ${error.message}`);
    },
  });

  const deletePMP = useMutation({
    mutationFn: (id: string) => PMPService.deletePMP(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pmps'] });
      toast.success('PMP deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete PMP: ${error.message}`);
    },
  });

  return {
    pmps,
    isLoading,
    useGetPMPById,
    createPMP: createPMP.mutate,
    updatePMP: updatePMP.mutate,
    deletePMP: deletePMP.mutate,
    isCreating: createPMP.isPending,
    isUpdating: updatePMP.isPending,
    isDeleting: deletePMP.isPending,
  };
};
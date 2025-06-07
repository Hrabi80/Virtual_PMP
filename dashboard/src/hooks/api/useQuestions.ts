import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { QuestionService } from '@/api/services/question.service';
import { toast } from 'sonner';
import { CreateQuestionRequest, UpdateQuestionRequest } from '@/types/api';

export const useQuestions = (categoryId?: string) => {
  const queryClient = useQueryClient();

  const { data: questions, isLoading } = useQuery({
    queryKey: ['questions', categoryId],
    queryFn: () => categoryId ? QuestionService.getQuestionsByCategory(categoryId) : QuestionService.getAllQuestions(),
    enabled: !!categoryId,
  });

  const createQuestion = useMutation({
    mutationFn: (data: CreateQuestionRequest) => QuestionService.createQuestion(categoryId , data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
      toast.success('Question created successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to create question: ${error.message}`);
    },
  });

  const updateQuestion = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateQuestionRequest }) => QuestionService.updateQuestion(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
      toast.success('Question updated successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update question: ${error.message}`);
    },
  });

  const deleteQuestion = useMutation({
    mutationFn: (id: string) => QuestionService.deleteQuestion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
      toast.success('Question deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete question: ${error.message}`);
    },
  });

  return {
    questions,
    isLoading,
    createQuestion: createQuestion.mutate,
    updateQuestion: updateQuestion.mutate,
    deleteQuestion: deleteQuestion.mutate,
    isCreating: createQuestion.isPending,
    isUpdating: updateQuestion.isPending,
    isDeleting: deleteQuestion.isPending,
  };
};

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { QuestionService } from '@/api/services/question.service';
import { toast } from 'sonner';
import { CreateQuestionRequest, UpdateQuestionRequest } from '@/types/api';

export const useQuestions = (categoryId?: string, pmpId?: string) => {
  const queryClient = useQueryClient();

  const { data: questions, isLoading } = useQuery({
    queryKey: ['questions', categoryId],
    queryFn: () => categoryId ? QuestionService.getQuestionsByCategory(categoryId) : QuestionService.getAllQuestions(),
    enabled: !!categoryId,
  });

  const { data: pmpQuestions, isLoading: isPmpQuestionsLoading } = useQuery({
    queryKey: ['questions', 'pmp', pmpId],
    queryFn: () => QuestionService.getAllQuestionsByPMP(pmpId!),
    enabled: !!pmpId,
  });

  const createQuestion = useMutation({
    mutationFn: (data: CreateQuestionRequest) => {
      if (!categoryId) throw new Error('Category ID is required to create a question');
      return QuestionService.createQuestion(categoryId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions', categoryId] });
      queryClient.invalidateQueries({ queryKey: ['categories', categoryId, 'questions'] });
     // queryClient.invalidateQueries({ queryKey: ['questions', 'pmp', pmpId] }); // TODO: check if this is needed
      toast.success('Question created successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to create question: ${error.message}`);
    },
  });

  const updateQuestion = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateQuestionRequest }) => QuestionService.updateQuestion(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions', categoryId] });
      queryClient.invalidateQueries({ queryKey: ['categories', categoryId, 'questions'] });
      //  queryClient.invalidateQueries({ queryKey: ['questions', 'pmp', pmpId] }); //T
      toast.success('Question updated successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update question: ${error.message}`);
    },
  });

  const deleteQuestion = useMutation({
    mutationFn: (id: string) => QuestionService.deleteQuestion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions', categoryId] });
      queryClient.invalidateQueries({ queryKey: ['categories', categoryId, 'questions'] });
     // queryClient.invalidateQueries({ queryKey: ['questions', 'pmp', pmpId] });
      toast.success('Question deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete question: ${error.message}`);
    },
  });

  const addLinkedQuestion = useMutation({
    mutationFn: ({ sourceId, targetId }: { sourceId: string; targetId: string }) => 
      QuestionService.createBonusLink(sourceId, targetId, 'RELATED_TO_TOPIC', 5),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions', categoryId] });
      queryClient.invalidateQueries({ queryKey: ['questions', 'pmp', pmpId] });
      toast.success('Question linked successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to link question: ${error.message}`);
    },
  });

  return {
    questions,
    isLoading,
    pmpQuestions,
    isPmpQuestionsLoading,
    createQuestion: createQuestion.mutate,
    updateQuestion: updateQuestion.mutate,
    deleteQuestion: deleteQuestion.mutate,
    addLinkedQuestion: addLinkedQuestion.mutate,
    isCreating: createQuestion.isPending,
    isUpdating: updateQuestion.isPending,
    isDeleting: deleteQuestion.isPending,
    isLinking: addLinkedQuestion.isPending,
  };
};

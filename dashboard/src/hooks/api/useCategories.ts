import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { CategoryService } from '@/api/services/category.service'
import { toast } from 'sonner'
import type { QuestionCategory, CreateQuestionCategoryRequest, UpdateQuestionCategoryRequest } from '@/types/api'

export const useCategories = (pmpId: string) => {
  const queryClient = useQueryClient()

  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories', pmpId],
    queryFn: () => CategoryService.getCategories(pmpId),
    enabled: !!pmpId,
  })

  const createCategory = useMutation({
    mutationFn: (data: CreateQuestionCategoryRequest) => CategoryService.createCategory(pmpId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories', pmpId] })
      toast.success('Category created successfully')
    },
    onError: (error: Error) => {
      toast.error(`Failed to create category: ${error.message}`)
    },
  })

  const updateCategory = useMutation({
    mutationFn: ({ categoryId, data }: { categoryId: string; data: UpdateQuestionCategoryRequest }) => 
      CategoryService.updateCategory(pmpId, categoryId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories', pmpId] })
      toast.success('Category updated successfully')
    },
    onError: (error: Error) => {
      toast.error(`Failed to update category: ${error.message}`)
    },
  })

  const deleteCategory = useMutation({
    mutationFn: (categoryId: string) => CategoryService.deleteCategory(pmpId, categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories', pmpId] })
      toast.success('Category deleted successfully')
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete category: ${error.message}`)
    },
  })

  const useQuestionsByCategory = (categoryId: string) => useQuery({
    queryKey: ['categories', categoryId, 'questions'],
    queryFn: () => CategoryService.getQuestionsByCategory(categoryId),
    enabled: !!categoryId,
  })


  return {
    categories,
    isLoading,
    useQuestionsByCategory,
    createCategory: createCategory.mutate,
    updateCategory: updateCategory.mutate,
    deleteCategory: deleteCategory.mutate,
    isCreating: createCategory.isPending,
    isUpdating: updateCategory.isPending,
    isDeleting: deleteCategory.isPending,
  }
}

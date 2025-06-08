import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  Edit,
  Calendar,
  User,
  School,
  Plus,
  Pencil,
} from 'lucide-react';
import { QuestionCategory, Question } from '@/types/api';
import { AddCategoryDialog } from '@/components/dashboard/Category/AddCategoryDialog';
import { CategoryDetailDialog } from '@/components/dashboard/Category/CategoryDetailDialog';
import { ManageQuestionsDialog } from '@/components/dashboard/Question/ManageQuestionsDialog';
import { usePMPs } from '@/hooks/api/usePMPs';
import { useCategories } from '@/hooks/api/useCategories';

export const PMPDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { useGetPMPById } = usePMPs();
  const {
    data: pmp,
    isLoading: isPmpLoading,
    error,
  } = useGetPMPById(id!);

  const {
    categories = [],
    isLoading: isCategoriesLoading,
  } = useCategories(id!);

  
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<QuestionCategory | null>(null);
  const [isManageQuestionsOpen, setIsManageQuestionsOpen] = useState(false);
  const [isCategoryDetailOpen, setIsCategoryDetailOpen] = useState(false);

  if (isPmpLoading || isCategoriesLoading) {
    return <div>Loading…</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!pmp) {
    return <div>PMP not found</div>;
  }

  const totalQuestions = categories.reduce(
    (total, category) => total + (category.questions?.length || 0),
    0
  );

  const handleAddCategory = () => setIsAddCategoryOpen(true);
  const handleManageQuestions = (category: QuestionCategory) => {
    setSelectedCategory(category);
    setIsManageQuestionsOpen(true);
  };
  const handleManageCategory = (category: QuestionCategory) => {
    setSelectedCategory(category);
    setIsCategoryDetailOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{pmp.title}</h1>
              <p className="text-gray-600 mt-2">{pmp.annonceOfTheProblem}</p>
            </div>

            <Button
              onClick={() => navigate(`/pmp/${id}/edit`)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit PMP
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{pmp.description}</p>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader className="flex items-center justify-between pb-2">
                <div>
                  <CardTitle>Categories & Questions</CardTitle>
                  <CardDescription>
                    {categories.length} categories with {totalQuestions} total questions
                  </CardDescription>
                </div>
                <Button onClick={handleAddCategory}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {categories.map((category) => (
                    <div key={category.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {category.name}
                        </h3>
                        <div className="flex items-center space-x-2">
                          {/*   <Badge variant="secondary">
                            {category.questions?.length || 0} questions
                          </Badge> */}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleManageCategory(category)}
                            className="h-8 w-8 p-0"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleManageQuestions(category)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {category.questions?.map((q: Question) => (
                          <div key={q.id} className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="font-medium text-gray-900 mb-1">
                                  {q.questionText}
                                </p>
                                <p className="text-sm text-gray-600 mb-2">
                                  {q.response}
                                </p>
                                <div className="flex items-center space-x-2">
                                  <Badge
                                    variant={
                                      q.type === 'ASK_FOR_MEDICAL_PICTURE'
                                        ? 'default'
                                        : 'outline'
                                    }
                                  >
                                    {q.type === 'ASK_FOR_MEDICAL_PICTURE'
                                      ? 'Medical Picture'
                                      : 'Normal'}
                                  </Badge>
                                  <span className="text-sm text-gray-500">
                                    Score: {q.score}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>PMP Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Professor:</span>
                  <span className="text-sm font-medium">
                    {pmp.professorId || 'Not assigned'}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <School className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Classroom:</span>
                  <span className="text-sm font-medium">
                    {pmp.classroom?.name}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Created:</span>
                  <span className="text-sm font-medium">
                    {new Date(pmp.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Categories:</span>
                    <span className="text-sm font-medium">
                      {categories.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">
                      Total Questions:
                    </span>
                    <span className="text-sm font-medium">{totalQuestions}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Score:</span>
                    <span className="text-sm font-medium">
                      {categories.reduce(
                        (sum, cat) =>
                          sum +
                          (cat.questions?.reduce(
                            (s, question) => s + question.score,
                            0
                          ) || 0),
                        0
                      )}{' '}
                      points
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <AddCategoryDialog
        open={isAddCategoryOpen}
        onOpenChange={setIsAddCategoryOpen}
        pmp={pmp}
      />

      {selectedCategory && (
        <>
          <ManageQuestionsDialog
            open={isManageQuestionsOpen}
            onOpenChange={setIsManageQuestionsOpen}
            category={selectedCategory}
          />
          <CategoryDetailDialog
            open={isCategoryDetailOpen}
            onOpenChange={setIsCategoryDetailOpen}
            category={selectedCategory}
          />
        </>
      )}
    </div>
  );
};

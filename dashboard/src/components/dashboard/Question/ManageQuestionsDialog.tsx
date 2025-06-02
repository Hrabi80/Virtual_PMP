import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus, Edit, Trash2, Link, Award } from "lucide-react";
import { AddQuestionDialog } from "./AddQuestionDialog";
import { DeleteConfirmDialog } from "../MyPMPsTab/DeleteConfirmDialog";
import { ManageBonusDialog } from "../Bonus/ManageBonusDialog";

interface QuestionBonus {
  id: string;
  questionId: string;
  linkedQuestionId: string;
  bonusPoints: number;
  linkedQuestionText?: string;
}

interface Question {
  id: string;
  questionText: string;
  type: "NORMAL_QUESTION" | "ASK_FOR_MEDICAL_PICTURE";
  response: string;
  medicalPictureUrl?: string;
  score: number;
  questionCategoryId: string;
  createdAt: string;
  bonuses?: QuestionBonus[];
}

interface Category {
  id: string;
  name: string;
  pmpId: string;
  questions: Question[];
}

interface ManageQuestionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: Category | null;
}

export const ManageQuestionsDialog = ({
  open,
  onOpenChange,
  category,
}: ManageQuestionsDialogProps) => {
  const [addQuestionDialogOpen, setAddQuestionDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [manageBonusDialogOpen, setManageBonusDialogOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  // Mock data for all questions across categories (in real app, this would come from API)
  const allPMPQuestions: Question[] = [
    // Initial Assessment category questions
    ...(category?.questions || []),
    // Mock questions from other categories for demonstration
    {
      id: "q4",
      questionText: "Do you have any previous heart conditions?",
      type: "NORMAL_QUESTION",
      response: "My father had a heart attack when he was 55.",
      score: 20,
      questionCategoryId: "cat2",
      createdAt: "2024-01-15",
    },
    {
      id: "q5",
      questionText: "What medications are you currently taking?",
      type: "NORMAL_QUESTION",
      response: "I take aspirin daily and lisinopril for blood pressure.",
      score: 15,
      questionCategoryId: "cat2",
      createdAt: "2024-01-15",
    },
  ];

  const handleAddQuestion = () => {
    setEditingQuestion(null);
    setAddQuestionDialogOpen(true);
  };

  const handleEditQuestion = (question: Question) => {
    setEditingQuestion(question);
    setAddQuestionDialogOpen(true);
  };

  const handleDeleteQuestion = (question: Question) => {
    setSelectedQuestion(question);
    setDeleteDialogOpen(true);
  };

  const handleManageBonus = (question: Question) => {
    setSelectedQuestion(question);
    setManageBonusDialogOpen(true);
  };

  const confirmDeleteQuestion = () => {
    if (selectedQuestion) {
      console.log("Delete question:", selectedQuestion.id);
      // API call to delete question
      setDeleteDialogOpen(false);
      setSelectedQuestion(null);
    }
  };

  const getQuestionTypeDisplay = (type: string) => {
    switch (type) {
      case "NORMAL_QUESTION":
        return <Badge variant="default">Normal Question</Badge>;
      case "ASK_FOR_MEDICAL_PICTURE":
        return <Badge variant="secondary">Medical Picture</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const getTotalBonusPoints = (question: Question) => {
    if (!question.bonuses || question.bonuses.length === 0) return 0;
    return question.bonuses.reduce(
      (total, bonus) => total + bonus.bonusPoints,
      0
    );
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Manage Questions - {category?.name}</DialogTitle>
            <DialogDescription>
              Add, edit, or delete questions within this category. Configure
              bonus points for question sequences.
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-auto">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">
                    {category?.questions.length || 0} questions in this category
                  </p>
                </div>
                <Button
                  onClick={handleAddQuestion}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Question
                </Button>
              </div>

              {!category?.questions || category.questions.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-100 rounded-full w-fit mx-auto">
                      <Plus className="h-6 w-6 text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        No questions yet
                      </p>
                      <p className="text-sm text-gray-500">
                        Add your first question to get started
                      </p>
                    </div>
                    <Button onClick={handleAddQuestion} variant="outline">
                      Add Question
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {category.questions.map((question) => (
                    <div
                      key={question.id}
                      className="border rounded-lg bg-white"
                    >
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value={question.id} className="border-0">
                          <AccordionTrigger className="px-6 py-4 hover:no-underline">
                            <div className="flex items-center justify-between w-full mr-4">
                              <div className="flex items-start space-x-4">
                                <div className="flex-1">
                                  <p className="font-medium text-gray-900 text-left text-sm">
                                    {question.questionText}
                                  </p>
                                  <div className="flex items-center space-x-2 mt-2">
                                    {getQuestionTypeDisplay(question.type)}
                                    <Badge variant="outline">
                                      {question.score} pts
                                    </Badge>
                                    {question.bonuses &&
                                      question.bonuses.length > 0 && (
                                        <Badge
                                          variant="secondary"
                                          className="bg-green-100 text-green-800"
                                        >
                                          +{getTotalBonusPoints(question)} bonus
                                          pts
                                        </Badge>
                                      )}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditQuestion(question);
                                  }}
                                  className="h-8 w-8 p-0"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleManageBonus(question);
                                  }}
                                  className="h-8 w-8 p-0 text-green-600 hover:text-green-700"
                                >
                                  <Award className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteQuestion(question);
                                  }}
                                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-6 pb-4">
                            <div className="space-y-4">
                              <div>
                                <h5 className="text-sm font-medium text-gray-900 mb-2">
                                  Virtual Patient Response:
                                </h5>
                                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                                  {question.response}
                                </p>
                              </div>

                              {question.medicalPictureUrl && (
                                <div>
                                  <h5 className="text-sm font-medium text-gray-900 mb-2">
                                    Medical Picture:
                                  </h5>
                                  <p className="text-sm text-blue-600">
                                    {question.medicalPictureUrl}
                                  </p>
                                </div>
                              )}

                              {question.bonuses &&
                                question.bonuses.length > 0 && (
                                  <div>
                                    <h5 className="text-sm font-medium text-gray-900 mb-2">
                                      Bonus Links ({question.bonuses.length}):
                                    </h5>
                                    <div className="space-y-2">
                                      {question.bonuses.map((bonus) => (
                                        <div
                                          key={bonus.id}
                                          className="flex items-center justify-between p-2 bg-green-50 rounded-md"
                                        >
                                          <div className="flex items-center space-x-2">
                                            <Link className="h-4 w-4 text-green-600" />
                                            <span className="text-sm text-gray-900">
                                              Links to: "
                                              {bonus.linkedQuestionText ||
                                                "Unknown Question"}
                                              "
                                            </span>
                                          </div>
                                          <Badge
                                            variant="outline"
                                            className="text-green-600"
                                          >
                                            +{bonus.bonusPoints} pts
                                          </Badge>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                              <div className="flex items-center justify-between pt-2 border-t">
                                <p className="text-xs text-gray-500">
                                  Created:{" "}
                                  {new Date(
                                    question.createdAt
                                  ).toLocaleDateString()}
                                </p>
                                <div className="flex items-center space-x-1">
                                  <span className="text-xs text-gray-500">
                                    Total Possible Points:
                                  </span>
                                  <Badge variant="outline">
                                    {question.score +
                                      getTotalBonusPoints(question)}{" "}
                                    pts
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AddQuestionDialog
        open={addQuestionDialogOpen}
        onOpenChange={setAddQuestionDialogOpen}
        category={category}
        editingQuestion={editingQuestion}
      />

      <ManageBonusDialog
        open={manageBonusDialogOpen}
        onOpenChange={setManageBonusDialogOpen}
        question={selectedQuestion}
        allQuestions={allPMPQuestions}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDeleteQuestion}
        title={selectedQuestion?.questionText || ""}
      />
    </>
  );
};

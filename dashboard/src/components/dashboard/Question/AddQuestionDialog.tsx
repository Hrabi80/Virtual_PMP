import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { QuestionCategory, QuestionType } from "@/types/api"
import { useQuestions } from "@/hooks/api/useQuestions"
import { Plus, X } from "lucide-react"
import { Card } from "@/components/ui/card"

interface AddQuestionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  category: QuestionCategory | null
  editingQuestion?: {
    id: string
    questionText: string
    type: QuestionType
    response: string
    medicalPictureUrl?: string
    score: number
  }
}

interface LinkedQuestion {
  targetId: string
  bonusScore: number
}

export const AddQuestionDialog = ({ open, onOpenChange, category, editingQuestion }: AddQuestionDialogProps) => {
  const [questionText, setQuestionText] = useState("")
  const [questionType, setQuestionType] = useState<QuestionType>(QuestionType.NORMAL_QUESTION)
  const [response, setResponse] = useState("")
  const [medicalPictureUrl, setMedicalPictureUrl] = useState("")
  const [score, setScore] = useState<number>(10)
  const [linkedQuestions, setLinkedQuestions] = useState<LinkedQuestion[]>([])
  const [showAddLink, setShowAddLink] = useState(false)
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>("")
  const [bonusScore, setBonusScore] = useState<number>(5)

  const { 
    createQuestion, 
    updateQuestion, 
    addLinkedQuestion,
    isCreating, 
    isUpdating,
    isLinking,
    pmpQuestions,
    isPmpQuestionsLoading 
  } = useQuestions(category?.id, category?.pmpId)

  const isEditing = !!editingQuestion
  const isLoading = isCreating || isUpdating || isLinking

  useEffect(() => {
    if (editingQuestion) {
      setQuestionText(editingQuestion.questionText)
      setQuestionType(editingQuestion.type)
      setResponse(editingQuestion.response)
      setMedicalPictureUrl(editingQuestion.medicalPictureUrl || "")
      setScore(editingQuestion.score)
    } else {
      resetForm()
    }
  }, [editingQuestion, open])

  const resetForm = () => {
    setQuestionText("")
    setQuestionType(QuestionType.NORMAL_QUESTION)
    setResponse("")
    setMedicalPictureUrl("")
    setScore(10)
    setLinkedQuestions([])
    setShowAddLink(false)
    setSelectedQuestionId("")
    setBonusScore(5)
  }

  const handleAddLink = () => {
    if (!selectedQuestionId) return;
    
    setLinkedQuestions(prev => [...prev, {
      targetId: selectedQuestionId,
      bonusScore: bonusScore
    }])
    
    setSelectedQuestionId("")
    setBonusScore(5)
    setShowAddLink(false)
  }

  const handleRemoveLink = (targetId: string) => {
    setLinkedQuestions(prev => prev.filter(q => q.targetId !== targetId))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!category || !questionText.trim() || !response.trim()) return

    try {
      const questionData = {
        questionText: questionText.trim(),
        type: questionType,
        response: response.trim(),
        medicalPictureUrl: questionType === QuestionType.ASK_FOR_MEDICAL_PICTURE ? medicalPictureUrl.trim() : undefined,
        score,
        questionCategoryId: category.id
      }

      let createdOrUpdatedQuestion;
      if (isEditing && editingQuestion) {
        createdOrUpdatedQuestion = await updateQuestion({ 
          id: editingQuestion.id, 
          data: {
            ...questionData,
            questionCategoryId: category.id
          }
        })
      } else {
        createdOrUpdatedQuestion = await createQuestion({
          ...questionData,
          questionCategoryId: category.id
        })
      }

      // Add linked questions if any
      if (createdOrUpdatedQuestion) {
        for (const link of linkedQuestions) {
          await addLinkedQuestion({
            sourceId: createdOrUpdatedQuestion.id,
            targetId: link.targetId
          })
        }
      }
      
      resetForm()
      onOpenChange(false)
    } catch (error) {
      console.error("Error saving question:", error)
    }
  }

  const handleClose = () => {
    resetForm()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Question" : "Add New Question"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="questionText" className="text-sm font-medium">Question Text</label>
            <Textarea
              id="questionText"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="Enter the question text..."
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="questionType" className="text-sm font-medium">Question Type</label>
            <Select value={questionType} onValueChange={(value: QuestionType) => setQuestionType(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select question type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={QuestionType.NORMAL_QUESTION}>Normal Question</SelectItem>
                <SelectItem value={QuestionType.ASK_FOR_MEDICAL_PICTURE}>Ask for Medical Picture</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="response" className="text-sm font-medium">Response</label>
            <Textarea
              id="response"
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Enter the response..."
              required
            />
          </div>

          {questionType === QuestionType.ASK_FOR_MEDICAL_PICTURE && (
            <div className="space-y-2">
              <label htmlFor="medicalPictureUrl" className="text-sm font-medium">Medical Picture URL</label>
              <Input
                id="medicalPictureUrl"
                type="url"
                value={medicalPictureUrl}
                onChange={(e) => setMedicalPictureUrl(e.target.value)}
                placeholder="Enter the medical picture URL..."
              />
            </div>
          )}
          
          <div className="space-y-2">
            <label htmlFor="score" className="text-sm font-medium">Score</label>
            <Input
              id="score"
              type="number"
              min="0"
              step="0.5"
              value={score}
              onChange={(e) => setScore(parseFloat(e.target.value))}
              required
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Linked Questions</label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => setShowAddLink(true)}
                disabled={showAddLink || isLoading}
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Link
              </Button>
            </div>

            {showAddLink && (
              <Card className="p-4 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Question</label>
                  <Select value={selectedQuestionId} onValueChange={setSelectedQuestionId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a question to link" />
                    </SelectTrigger>
                    <SelectContent>
                      {pmpQuestions?.map(q => (
                        <SelectItem key={q.id} value={q.id}>
                          {q.questionText}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Bonus Score</label>
                  <Input
                    type="number"
                    min="0"
                    step="0.5"
                    value={bonusScore}
                    onChange={(e) => setBonusScore(parseFloat(e.target.value))}
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowAddLink(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="button" 
                    size="sm"
                    onClick={handleAddLink}
                    disabled={!selectedQuestionId}
                  >
                    Add Link
                  </Button>
                </div>
              </Card>
            )}

            {linkedQuestions.length > 0 && (
              <div className="space-y-2">
                {linkedQuestions.map(link => {
                  const question = pmpQuestions?.find(q => q.id === link.targetId);
                  return (
                    <Card key={link.targetId} className="p-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{question?.questionText}</p>
                        <p className="text-sm text-gray-500">Bonus Score: {link.bonusScore}</p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveLink(link.targetId)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handleClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : isEditing ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

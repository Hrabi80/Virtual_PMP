
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Question {
  id: string
  questionText: string
  type: "NORMAL_QUESTION" | "ASK_FOR_MEDICAL_PICTURE"
  response: string
  medicalPictureUrl?: string
  score: number
  questionCategoryId: string
  createdAt: string
}

interface Category {
  id: string
  name: string
  pmpId: string
  questions: Question[]
}

interface AddQuestionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  category: Category | null
  editingQuestion?: Question | null
}

export const AddQuestionDialog = ({ open, onOpenChange, category, editingQuestion }: AddQuestionDialogProps) => {
  const [questionText, setQuestionText] = useState("")
  const [questionType, setQuestionType] = useState<"NORMAL_QUESTION" | "ASK_FOR_MEDICAL_PICTURE">("NORMAL_QUESTION")
  const [response, setResponse] = useState("")
  const [medicalPictureUrl, setMedicalPictureUrl] = useState("")
  const [score, setScore] = useState<number>(10)
  const [isLoading, setIsLoading] = useState(false)

  const isEditing = !!editingQuestion

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
    setQuestionType("NORMAL_QUESTION")
    setResponse("")
    setMedicalPictureUrl("")
    setScore(10)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!category || !questionText.trim() || !response.trim()) return

    setIsLoading(true)
    
    try {
      const questionData = {
        questionText: questionText.trim(),
        type: questionType,
        response: response.trim(),
        medicalPictureUrl: questionType === "ASK_FOR_MEDICAL_PICTURE" ? medicalPictureUrl : undefined,
        score,
        questionCategoryId: category.id
      }

      if (isEditing) {
        console.log("Updating question:", { id: editingQuestion?.id, ...questionData })
      } else {
        console.log("Creating question:", questionData)
      }
      
      resetForm()
      onOpenChange(false)
    } catch (error) {
      console.error("Error saving question:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    resetForm()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Question" : "Add New Question"}
          </DialogTitle>
          <DialogDescription>
            {isEditing 
              ? `Update the question in "${category?.name}" category.`
              : `Add a new question to the "${category?.name}" category. Students will be able to ask this question during the PMP session.`
            }
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="questionText">Question Text *</Label>
            <Textarea
              id="questionText"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="e.g., What brings you to the clinic today?"
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="questionType">Question Type *</Label>
            <Select value={questionType} onValueChange={(value: "NORMAL_QUESTION" | "ASK_FOR_MEDICAL_PICTURE") => setQuestionType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NORMAL_QUESTION">Normal Question</SelectItem>
                <SelectItem value="ASK_FOR_MEDICAL_PICTURE">Ask for Medical Picture</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {questionType === "ASK_FOR_MEDICAL_PICTURE" && (
            <div className="space-y-2">
              <Label htmlFor="medicalPictureUrl">Medical Picture URL</Label>
              <Input
                id="medicalPictureUrl"
                value={medicalPictureUrl}
                onChange={(e) => setMedicalPictureUrl(e.target.value)}
                placeholder="e.g., /images/chest-diagram.jpg"
                type="url"
              />
              <p className="text-sm text-gray-500">
                Provide a URL to the medical image that will be shown with this question.
              </p>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="response">Virtual Patient Response *</Label>
            <Textarea
              id="response"
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="e.g., I've been having chest pain for the past week..."
              rows={4}
              required
            />
            <p className="text-sm text-gray-500">
              This is how the virtual patient will respond when students ask this question.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="score">Score Points *</Label>
            <Input
              id="score"
              type="number"
              value={score}
              onChange={(e) => setScore(Number(e.target.value))}
              min="0"
              max="100"
              step="0.5"
              required
            />
            <p className="text-sm text-gray-500">
              Points awarded to students for asking this question (0-100).
            </p>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading || !questionText.trim() || !response.trim()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading 
                ? (isEditing ? "Updating..." : "Creating...") 
                : (isEditing ? "Update Question" : "Create Question")
              }
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

/*import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, X, Link } from "lucide-react"

interface QuestionBonus {
  id: string
  questionId: string
  linkedQuestionId: string
  bonusPoints: number
  linkedQuestionText?: string
}

interface Question {
  id: string
  questionText: string
  type: "NORMAL_QUESTION" | "ASK_FOR_MEDICAL_PICTURE"
  response: string
  medicalPictureUrl?: string
  score: number
  questionCategoryId: string
  createdAt: string
  bonuses?: QuestionBonus[]
}

interface ManageBonusDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  question: Question | null
  allQuestions: Question[]
}

export const ManageBonusDialog = ({ open, onOpenChange, question, allQuestions }: ManageBonusDialogProps) => {
  const [bonuses, setBonuses] = useState<QuestionBonus[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (question && question.bonuses) {
      setBonuses([...question.bonuses])
    } else {
      setBonuses([])
    }
  }, [question, open])

  const availableQuestions = allQuestions.filter(q => q.id !== question?.id)

  const addNewBonus = () => {
    const newBonus: QuestionBonus = {
      id: `temp-${Date.now()}`,
      questionId: question?.id || "",
      linkedQuestionId: "",
      bonusPoints: 5,
      linkedQuestionText: ""
    }
    setBonuses([...bonuses, newBonus])
  }

  const updateBonus = (index: number, field: keyof QuestionBonus, value: string | number) => {
    const updatedBonuses = [...bonuses]
    if (field === 'linkedQuestionId') {
      const linkedQuestion = availableQuestions.find(q => q.id === value as string)
      updatedBonuses[index] = {
        ...updatedBonuses[index],
        [field]: value as string,
        linkedQuestionText: linkedQuestion?.questionText || ""
      }
    } else if (field === 'bonusPoints') {
      updatedBonuses[index] = {
        ...updatedBonuses[index],
        [field]: value as number
      }
    } else {
      updatedBonuses[index] = {
        ...updatedBonuses[index],
        [field]: value as string
      }
    }
    setBonuses(updatedBonuses)
  }

  const removeBonus = (index: number) => {
    const updatedBonuses = bonuses.filter((_, i) => i !== index)
    setBonuses(updatedBonuses)
  }

  const handleSave = async () => {
    if (!question) return

    setIsLoading(true)
    try {
      // Filter out bonuses without linked questions
      const validBonuses = bonuses.filter(bonus => 
        bonus.linkedQuestionId && bonus.bonusPoints > 0
      )

      console.log("Saving bonus links for question:", question.id, validBonuses)
      // API call to save bonus links

      onOpenChange(false)
    } catch (error) {
      console.error("Error saving bonus links:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setBonuses(question?.bonuses || [])
    onOpenChange(false)
  }

  const getTotalBonusPoints = () => {
    return bonuses
      .filter(bonus => bonus.linkedQuestionId && bonus.bonusPoints > 0)
      .reduce((total, bonus) => total + bonus.bonusPoints, 0)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Link className="h-5 w-5" />
            <span>Manage Bonus Links</span>
          </DialogTitle>
          <DialogDescription>
            Link this question to other questions for bonus points. Students get bonus points when they ask linked questions in sequence.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-auto space-y-4">
          {question && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Current Question:</h4>
              <p className="text-sm text-gray-700">{question.questionText}</p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant="outline">{question.score} base pts</Badge>
                {getTotalBonusPoints() > 0 && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    +{getTotalBonusPoints()} bonus pts
                  </Badge>
                )}
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900">Bonus Links ({bonuses.length})</h4>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addNewBonus}
                className="text-blue-600 hover:text-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Bonus Link
              </Button>
            </div>

            {bonuses.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <div className="space-y-3">
                  <div className="p-3 bg-gray-100 rounded-full w-fit mx-auto">
                    <Link className="h-6 w-6 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">No bonus links yet</p>
                    <p className="text-sm text-gray-500">
                      Add bonus links to reward students for asking related questions
                    </p>
                  </div>
                  <Button 
                    onClick={addNewBonus}
                    variant="outline"
                  >
                    Add First Bonus Link
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {bonuses.map((bonus, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-white">
                    <div className="flex items-start space-x-3">
                      <div className="flex-1 space-y-3">
                        <div>
                          <Label htmlFor={`linkedQuestion-${index}`}>Link to Question *</Label>
                          <Select
                            value={bonus.linkedQuestionId}
                            onValueChange={(value) => updateBonus(index, 'linkedQuestionId', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a question to link..." />
                            </SelectTrigger>
                            <SelectContent>
                              {availableQuestions.map((q) => (
                                <SelectItem key={q.id} value={q.id}>
                                  <div className="flex flex-col">
                                    <span className="font-medium">{q.questionText}</span>
                                    <span className="text-xs text-gray-500">
                                      {q.score} pts - {q.type.replace('_', ' ')}
                                    </span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor={`bonusPoints-${index}`}>Bonus Points *</Label>
                          <Input
                            id={`bonusPoints-${index}`}
                            type="number"
                            value={bonus.bonusPoints}
                            onChange={(e) => updateBonus(index, 'bonusPoints', Number(e.target.value))}
                            min="0"
                            max="50"
                            step="0.5"
                            placeholder="e.g., 5"
                          />
                        </div>
                      </div>

                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeBonus(index)}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 mt-6"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {bonuses.length > 0 && (
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Students will receive bonus points when they ask the linked questions after asking this question during the PMP session.
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? "Saving..." : "Save Bonus Links"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
*/
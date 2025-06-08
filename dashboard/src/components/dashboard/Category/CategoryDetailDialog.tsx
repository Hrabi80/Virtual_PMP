import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, Trash2, Save, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { QuestionCategory } from "@/types/api"
import { useCategories } from "@/hooks/api/useCategories"

interface CategoryDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  category: QuestionCategory | null
}

export const CategoryDetailDialog = ({ open, onOpenChange, category }: CategoryDetailDialogProps) => {
  const [name, setName] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const { toast } = useToast()
  
  const { updateCategory, deleteCategory, isUpdating, isDeleting } = useCategories(category?.pmpId || "")
  const { data: questions = [] } = useCategories(category?.pmpId || "").useQuestionsByCategory(category?.id || "")

  useEffect(() => {
    if (category) {
      setName(category.name)
      setIsEditing(false)
    } else {
      setName("")
      setIsEditing(false)
    }
  }, [category])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSubmit = async () => {
    if (!category || !name.trim()) return

    updateCategory({
      categoryId: category.id,
      data: { name }
    })
    handleClose();
  }

  const handleDelete = async () => {
    if (!category) return

    if (window.confirm("Are you sure you want to delete this category? This action cannot be undone.")) {
      deleteCategory(category.id)
      onOpenChange(false)
    }
  }

  const handleClose = () => {
    setIsEditing(false)
    setName("")
    onOpenChange(false)
  }

  if (!category) return null

  const totalScore = questions.reduce((total, question) => total + question.score, 0)

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            {isEditing ? "Edit Category" : "Category Details"}
            {!isEditing && (
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleEdit}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  {isDeleting ? "Deleting..." : "Delete"}
                </Button>
              </div>
            )}
          </DialogTitle>
          <DialogDescription>
            {isEditing ? "Edit category information" : "View category details and manage questions"}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {isEditing ? (
            <div className="space-y-2">
              <Label htmlFor="name">Category Name *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter category name"
                required
              />
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{category.name}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                { /* <span>{questions.length} questions</span>
                  <span>Total Score: {totalScore} points</span> */}
                </div>
              </div>
{/*
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  {questions.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No questions in this category yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {questions.map((question, index) => (
                        <div key={question.id} className="p-3 border rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <span className="text-sm font-medium text-gray-600">Q{index + 1}</span>
                            <div className="flex items-center space-x-2">
                              <Badge 
                                variant={question.type === "ASK_FOR_MEDICAL_PICTURE" ? "default" : "outline"}
                              >
                                {question.type === "ASK_FOR_MEDICAL_PICTURE" ? "Medical Picture" : "Normal"}
                              </Badge>
                              <span className="text-sm text-gray-500">
                                {question.score} pts
                              </span>
                            </div>
                          </div>
                          <p className="font-medium text-gray-900 mb-1">
                            {question.questionText}
                          </p>
                          <p className="text-sm text-gray-600">
                            {question.response}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
              */}
            </>
          )}
        </div>

        {isEditing && (
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsEditing(false)}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={isUpdating || !name.trim()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Save className="h-4 w-4 mr-2" />
              {isUpdating ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}

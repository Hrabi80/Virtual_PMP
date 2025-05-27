
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, Trash2, Save, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

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

interface CategoryDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  category: Category | null
}

export const CategoryDetailDialog = ({ open, onOpenChange, category }: CategoryDetailDialogProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState("")
  const [editedDescription, setEditedDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleEdit = () => {
    if (category) {
      setEditedName(category.name)
      setEditedDescription("")
      setIsEditing(true)
    }
  }

  const handleSave = async () => {
    if (!category || !editedName.trim()) return

    setIsLoading(true)
    try {
      // API call to update category
      console.log("Updating category:", {
        id: category.id,
        name: editedName,
        description: editedDescription
      })
      
      toast({
        title: "Category Updated",
        description: "Category has been successfully updated.",
      })
      
      setIsEditing(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update category. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!category) return

    setIsLoading(true)
    try {
      // API call to delete category
      console.log("Deleting category:", category.id)
      
      toast({
        title: "Category Deleted",
        description: "Category has been successfully deleted.",
      })
      
      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete category. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setIsEditing(false)
    setEditedName("")
    setEditedDescription("")
    onOpenChange(false)
  }

  if (!category) return null

  const totalScore = category.questions.reduce((total, question) => total + question.score, 0)

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
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
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
            <>
              <div className="space-y-2">
                <Label htmlFor="categoryName">Category Name *</Label>
                <Input
                  id="categoryName"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  placeholder="Enter category name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="categoryDescription">Description (Optional)</Label>
                <Textarea
                  id="categoryDescription"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  placeholder="Brief description of this category..."
                  rows={3}
                />
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{category.name}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{category.questions.length} questions</span>
                  <span>Total Score: {totalScore} points</span>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  {category.questions.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No questions in this category yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {category.questions.map((question, index) => (
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
              onClick={handleSave}
              disabled={isLoading || !editedName.trim()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}

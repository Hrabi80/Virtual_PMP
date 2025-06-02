
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Eye, Edit, Trash2 } from "lucide-react"

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

interface CategoryListProps {
  categories: Category[]
  onManageQuestions: (category: Category) => void
  onManageCategory: (category: Category) => void
}

export const CategoryList = ({ categories, onManageQuestions, onManageCategory }: CategoryListProps) => {
  return (
    <div className="space-y-2">
      <h4 className="font-medium text-gray-900">Categories ({categories.length})</h4>
      {categories.map((category) => (
        <div key={category.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div>
            <p className="font-medium text-gray-900">{category.name}</p>
            <p className="text-sm text-gray-500">{category.questions.length} questions</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onManageCategory(category)}
              className="text-gray-600 hover:text-gray-700"
            >
              <Eye className="h-4 w-4 mr-2" />
              View
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onManageQuestions(category)}
              className="text-blue-600 hover:text-blue-700"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Questions
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

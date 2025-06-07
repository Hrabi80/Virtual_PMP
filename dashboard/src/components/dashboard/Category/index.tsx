import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, FileText } from "lucide-react"
import { QuestionCategory } from "@/types/api"

interface CategoryListProps {
  categories: QuestionCategory[]
  onManageQuestions: (category: QuestionCategory) => void
  onManageCategory: (category: QuestionCategory) => void
}

export const CategoryList = ({
  categories,
  onManageQuestions,
  onManageCategory,
}: CategoryListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category) => (
        <Card key={category.id}>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">{category.name}</CardTitle>
            <CardDescription>
              Created {new Date(category.createdAt).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onManageQuestions(category)}
                className="text-blue-600 hover:text-blue-700"
              >
                <FileText className="h-4 w-4 mr-2" />
                Questions
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onManageCategory(category)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

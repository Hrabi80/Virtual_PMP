
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus } from "lucide-react"
import { CreatePMPDialog } from "./CreatePMPDialog"
import { DeleteConfirmDialog } from "./DeleteConfirmDialog"
import { AddCategoryDialog } from "../Category/AddCategoryDialog"
import { ManageQuestionsDialog } from "../Question/ManageQuestionsDialog"
import { PMPTableRow } from "./PMPTableRow"
import { CategoryDetailDialog } from "../Category/CategoryDetailDialog"

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

interface PMP {
  id: string
  title: string
  description: string
  annonceOfTheProblem: string
  professorName: string
  classroomName: string
  createdBy: string
  createdAt: string
  isVisible?: boolean
  categories?: Category[]
}

interface MyPMPsTabProps {
  pmps: PMP[]
  professorId: string
}

export const MyPMPsTab = ({ pmps, professorId }: MyPMPsTabProps) => {
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedPMP, setSelectedPMP] = useState<PMP | null>(null)
  const [addCategoryDialogOpen, setAddCategoryDialogOpen] = useState(false)
  const [manageQuestionsDialogOpen, setManageQuestionsDialogOpen] = useState(false)
  const [categoryDetailDialogOpen, setCategoryDetailDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  // Mock data for demonstration - in real app, this would come from API
  const [pmpCategories, setPmpCategories] = useState<{ [pmpId: string]: Category[] }>({
    "1": [
      {
        id: "cat1",
        name: "Initial Assessment",
        pmpId: "1",
        questions: [
          {
            id: "q1",
            questionText: "What brings you to the clinic today?",
            type: "NORMAL_QUESTION",
            response: "I've been having chest pain for the past week.",
            score: 10,
            questionCategoryId: "cat1",
            createdAt: "2024-01-15"
          },
          {
            id: "q2",
            questionText: "Can you show me where it hurts?",
            type: "ASK_FOR_MEDICAL_PICTURE",
            response: "The pain is located in the center of my chest.",
            medicalPictureUrl: "/images/chest-diagram.jpg",
            score: 15,
            questionCategoryId: "cat1",
            createdAt: "2024-01-15"
          }
        ]
      },
      {
        id: "cat2",
        name: "Medical History",
        pmpId: "1",
        questions: [
          {
            id: "q3",
            questionText: "Do you have any previous heart conditions?",
            type: "NORMAL_QUESTION",
            response: "My father had a heart attack when he was 55.",
            score: 20,
            questionCategoryId: "cat2",
            createdAt: "2024-01-15"
          }
        ]
      }
    ]
  })

  const handleEdit = (pmp: PMP) => {
    console.log("Edit PMP:", pmp.id)
  }

  const handleDelete = (pmp: PMP) => {
    setSelectedPMP(pmp)
    setDeleteDialogOpen(true)
  }

  const handleAddCategory = (pmp: PMP) => {
    setSelectedPMP(pmp)
    setAddCategoryDialogOpen(true)
  }

  const handleManageQuestions = (category: Category) => {
    setSelectedCategory(category)
    setManageQuestionsDialogOpen(true)
  }

  const handleManageCategory = (category: Category) => {
    setSelectedCategory(category)
    setCategoryDetailDialogOpen(true)
  }

  const confirmDelete = () => {
    if (selectedPMP) {
      console.log("Delete PMP:", selectedPMP.id)
      setDeleteDialogOpen(false)
      setSelectedPMP(null)
    }
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle>My PMPs</CardTitle>
            <CardDescription>
              Manage your Problem-Based Learning cases and their categories
            </CardDescription>
          </div>
          <Button 
            onClick={() => setShowCreateDialog(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New PMP
          </Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Classroom</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pmps.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-12">
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <div className="p-3 bg-gray-100 rounded-full">
                          <Plus className="h-6 w-6 text-gray-400" />
                        </div>
                        <div className="space-y-1">
                          <p className="font-medium text-gray-900">No PMPs yet</p>
                          <p className="text-sm text-gray-500">
                            Create your first PMP to get started
                          </p>
                        </div>
                        <Button 
                          onClick={() => setShowCreateDialog(true)}
                          variant="outline"
                        >
                          Create New PMP
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  pmps.map((pmp) => (
                    <PMPTableRow
                      key={pmp.id}
                      pmp={pmp}
                      categories={pmpCategories[pmp.id] || []}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onAddCategory={handleAddCategory}
                      onManageQuestions={handleManageQuestions}
                      onManageCategory={handleManageCategory}
                    />
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <CreatePMPDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        professorId={professorId}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
        title={selectedPMP?.title || ""}
      />

      <AddCategoryDialog
        open={addCategoryDialogOpen}
        onOpenChange={setAddCategoryDialogOpen}
        pmp={selectedPMP}
      />

      <ManageQuestionsDialog
        open={manageQuestionsDialogOpen}
        onOpenChange={setManageQuestionsDialogOpen}
        category={selectedCategory}
      />

      <CategoryDetailDialog
        open={categoryDetailDialogOpen}
        onOpenChange={setCategoryDetailDialogOpen}
        category={selectedCategory}
      />
    </>
  )
}

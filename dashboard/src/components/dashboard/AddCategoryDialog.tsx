
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface PMP {
  id: string
  title: string
  description: string
  annonceOfTheProblem: string
  professorName: string
  classroomName: string
  createdBy: string
  createdAt: string
}

interface AddCategoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  pmp: PMP | null
}

export const AddCategoryDialog = ({ open, onOpenChange, pmp }: AddCategoryDialogProps) => {
  const [categoryName, setCategoryName] = useState("")
  const [categoryDescription, setCategoryDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!pmp || !categoryName.trim()) return

    setIsLoading(true)
    
    try {
      // API call to create category
      console.log("Creating category:", {
        name: categoryName,
        description: categoryDescription,
        pmpId: pmp.id
      })
      
      // Reset form and close dialog
      setCategoryName("")
      setCategoryDescription("")
      onOpenChange(false)
    } catch (error) {
      console.error("Error creating category:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setCategoryName("")
    setCategoryDescription("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription>
            Add a new question category to "{pmp?.title}". Categories help organize related questions.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="categoryName">Category Name *</Label>
            <Input
              id="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="e.g., Initial Assessment, Medical History"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="categoryDescription">Description (Optional)</Label>
            <Textarea
              id="categoryDescription"
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
              placeholder="Brief description of this category..."
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading || !categoryName.trim()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? "Creating..." : "Create Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

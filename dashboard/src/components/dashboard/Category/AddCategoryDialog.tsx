import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PMP } from "@/types/api"
import { useCategories } from "@/hooks/api/useCategories"

interface AddCategoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  pmp: PMP | null
}

export const AddCategoryDialog = ({ open, onOpenChange, pmp }: AddCategoryDialogProps) => {
  const [name, setName] = useState("")
  const { createCategory, isCreating } = useCategories(pmp?.id || "");

  const handleSubmit = async () => {
    if (!pmp || !name.trim()) return

    await createCategory({
      name,
      pmpId: pmp.id,
    })
    onOpenChange(false)
    setName("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription>
            Create a new category for questions in this PMP.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              placeholder="e.g., History Taking"
              className="col-span-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isCreating || !name.trim()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isCreating ? "Creating..." : "Create Category"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

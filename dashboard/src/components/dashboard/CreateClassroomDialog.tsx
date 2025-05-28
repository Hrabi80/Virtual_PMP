
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useCreateClassroom } from "@/hooks/api/useClassrooms"
import type { CreateClassroomRequest } from "@/types/api"

interface CreateClassroomDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const CreateClassroomDialog = ({ open, onOpenChange }: CreateClassroomDialogProps) => {
  const [formData, setFormData] = useState<CreateClassroomRequest>({
    name: "",
    major: "",
    grade: 1,
    description: ""
  })
  
  const { toast } = useToast()
  const createClassroomMutation = useCreateClassroom()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim() || !formData.major.trim()) {
      toast({
        title: "Validation Error",
        description: "Name and major are required fields.",
        variant: "destructive",
      })
      return
    }

    try {
      // Using TanStack Query mutation - currently uses mock data
      await createClassroomMutation.mutateAsync(formData)
      
      toast({
        title: "Classroom Created",
        description: "Your classroom has been successfully created.",
      })
      
      setFormData({ name: "", major: "", grade: 1, description: "" })
      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create classroom. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleInputChange = (field: keyof CreateClassroomRequest, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Classroom</DialogTitle>
          <DialogDescription>
            Add a new classroom to organize your students and PMPs.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Classroom Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="e.g., Medical Students - Year 3"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="major">Major *</Label>
              <Input
                id="major"
                value={formData.major}
                onChange={(e) => handleInputChange('major', e.target.value)}
                placeholder="e.g., Medicine, Nursing, Biology"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="grade">Grade/Year</Label>
              <Input
                id="grade"
                type="number"
                min="1"
                max="10"
                value={formData.grade}
                onChange={(e) => handleInputChange('grade', parseInt(e.target.value) || 1)}
                placeholder="1"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Brief description of the classroom..."
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={createClassroomMutation.isPending}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {createClassroomMutation.isPending ? "Creating..." : "Create Classroom"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

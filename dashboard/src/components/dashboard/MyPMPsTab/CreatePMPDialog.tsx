import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react"
import { PMP } from "@/types/api"
import { usePMPs } from "@/hooks/api/usePMPs"
import { useClassrooms } from "@/hooks/api/useClassrooms"

interface CreatePMPDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  professorId: string
  pmp?: PMP | null
}

export const CreatePMPDialog = ({ open, onOpenChange, professorId, pmp }: CreatePMPDialogProps) => {
  const { createPMP, updatePMP } = usePMPs();
  const { data: classrooms, isLoading: isLoadingClassrooms } = useClassrooms();
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    annonceOfTheProblem: "",
    classroomId: ""
  })

  useEffect(() => {
    if (pmp) {
      setFormData({
        title: pmp.title,
        description: pmp.description,
        annonceOfTheProblem: pmp.annonceOfTheProblem,
        classroomId: pmp.classroom.id
      })
    } else {
      setFormData({
        title: "",
        description: "",
        annonceOfTheProblem: "",
        classroomId: ""
      })
    }
  }, [pmp])

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = () => {
    const data = {
      title: formData.title,
      description: formData.description,
      annonceOfTheProblem: formData.annonceOfTheProblem,
      classroomId: formData.classroomId,
      professorId
    }

    if (pmp) {
      updatePMP({ id: pmp.id, data })
    } else {
      createPMP(data)
    }

    onOpenChange(false)
    setStep(1)
    setFormData({
      title: "",
      description: "",
      annonceOfTheProblem: "",
      classroomId: ""
    })
  }

  const isStep1Valid = formData.title && formData.description && formData.annonceOfTheProblem
  const isStep2Valid = formData.classroomId

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{pmp ? 'Edit PMP' : 'Create New PMP'}</DialogTitle>
          <DialogDescription>
            Step {step} of 2: {step === 1 ? "PMP Details" : "Classroom Selection"}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">PMP Details</CardTitle>
                <CardDescription>
                  Provide the basic information for your Problem-Based Learning case
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Cardiovascular Assessment Case"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the learning objectives and case overview..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="annonce">Problem Announcement</Label>
                  <Textarea
                    id="annonce"
                    placeholder="Present the initial problem statement that students will see..."
                    value={formData.annonceOfTheProblem}
                    onChange={(e) => setFormData({ ...formData, annonceOfTheProblem: e.target.value })}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Classroom Selection</CardTitle>
                <CardDescription>
                  Choose which classroom will have access to this PMP
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="classroom">Select Classroom</Label>
                  <Select 
                    value={formData.classroomId} 
                    onValueChange={(value) => setFormData({ ...formData, classroomId: value })}
                    disabled={isLoadingClassrooms}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a classroom..." />
                    </SelectTrigger>
                    <SelectContent>
                      {classrooms?.map((classroom) => (
                        <SelectItem key={classroom.id} value={classroom.id}>
                          <div className="flex flex-col">
                            <span>{classroom.name}</span>
                            <span className="text-sm text-gray-500">{classroom.major}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {formData.classroomId && (
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-green-800">Classroom Selected</span>
                    </div>
                    <p className="text-sm text-green-700 mt-1">
                      Students in this classroom will be able to access and complete this PMP.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        <DialogFooter className="flex justify-between">
          <div>
            {step > 1 && (
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            )}
          </div>
          
          <div className="space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            
            {step < 2 ? (
              <Button 
                onClick={handleNext} 
                disabled={!isStep1Valid}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit} 
                disabled={!isStep2Valid}
                className="bg-green-600 hover:bg-green-700"
              >
                {pmp ? 'Update PMP' : 'Create PMP'}
                <CheckCircle className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

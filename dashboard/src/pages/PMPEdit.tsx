import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useQuery, useMutation } from "@tanstack/react-query"
import { PMP, UpdatePMPRequest } from "@/types/api"
import { PMPService } from "@/api/services/pmp.service"

export const PMPEdit = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { toast } = useToast()

  // Fetch PMP data
  const { data: pmp, isLoading, error } = useQuery({
    queryKey: ['pmp', id],
    queryFn: () => id ? PMPService.getPMP(id) : null,
    enabled: !!id
  })

  // Update PMP mutation
  const updatePMPMutation = useMutation({
    mutationFn: (data: UpdatePMPRequest) => id ? PMPService.updatePMP(id, data) : Promise.reject('No ID provided'),
    onSuccess: () => {
      toast({
        title: "PMP Updated",
        description: "Your PMP has been successfully updated.",
      })
      navigate(`/pmp/${id}`)
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: `Failed to update PMP: ${error.message}`,
        variant: "destructive",
      })
    }
  })

  const [formData, setFormData] = useState<UpdatePMPRequest>({
    title: "",
    description: "",
    annonceOfTheProblem: "",
    classroomId: "",
  })

  // Update form data when PMP data loads
  useEffect(() => {
    if (pmp) {
      setFormData({
        title: pmp.title,
        description: pmp.description,
        annonceOfTheProblem: pmp.annonceOfTheProblem,
        classroomId: pmp.classroomId,
      })
    }
  }, [pmp])

  const handleInputChange = (field: keyof UpdatePMPRequest, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = async () => {
    if (!id) return
    updatePMPMutation.mutate(formData)
  }

  if (isLoading) {
    return <div className="flex justify-center py-8">Loading PMP...</div>
  }

  if (error || !pmp) {
    return <div className="text-red-600 py-8">Error loading PMP</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit PMP</h1>
              <p className="text-gray-600 mt-2">Update your Problem-Based Learning case</p>
            </div>
            <Button
              onClick={handleSave}
              disabled={updatePMPMutation.isPending}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Save className="h-4 w-4 mr-2" />
              {updatePMPMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>PMP Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter PMP title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="classroom">Classroom ID</Label>
                <Input
                  id="classroom"
                  value={formData.classroomId}
                  onChange={(e) => handleInputChange('classroomId', e.target.value)}
                  placeholder="Enter classroom ID"
                  disabled
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="announcement">Problem Announcement</Label>
              <Textarea
                id="announcement"
                value={formData.annonceOfTheProblem}
                onChange={(e) => handleInputChange('annonceOfTheProblem', e.target.value)}
                placeholder="Enter the problem announcement"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter detailed description"
                rows={5}
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <Label htmlFor="visibility">PMP Visibility</Label>
                <p className="text-sm text-gray-500 mt-1">
                  Control whether this PMP is visible to students
                </p>
              </div>
              {/*<Switch
                id="visibility"
                checked={formData.isVisible}
                onCheckedChange={(checked) => handleInputChange('isVisible', checked)}
              />*/}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Professor ID</Label>
                <Input
                  value={pmp.professorId || 'Not assigned'}
                  disabled
                  className="bg-gray-50"
                />
                <p className="text-sm text-gray-500">Professor cannot be changed</p>
              </div>

              <div className="space-y-2">
                <Label>Created Date</Label>
                <Input
                  value={new Date(pmp.createdAt).toLocaleDateString()}
                  disabled
                  className="bg-gray-50"
                />
                <p className="text-sm text-gray-500">Creation date cannot be changed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

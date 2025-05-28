
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Trash2 } from "lucide-react"
import { CreateClassroomDialog } from "./CreateClassroomDialog"
import { useClassrooms, useUpdateClassroom, useDeleteClassroom } from "@/hooks/api/useClassrooms"
import type { Classroom } from "@/types/api"

interface ClassroomsTabProps {
  professorId: string
}

export const ClassroomsTab = ({ professorId }: ClassroomsTabProps) => {
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  
  // Using TanStack Query hook - currently returns mock data
  const { data: classrooms = [], isLoading, error } = useClassrooms()
  const updateClassroomMutation = useUpdateClassroom()
  const deleteClassroomMutation = useDeleteClassroom()

  const handleEditClassroom = (classroom: Classroom) => {
    console.log('Editing classroom:', classroom)
    // TODO: Implement classroom editing logic when API is ready
    // updateClassroomMutation.mutate({ id: classroom.id, ...updatedData })
  }

  const handleDeleteClassroom = (classroom: Classroom) => {
    console.log('Deleting classroom:', classroom)
    // TODO: Implement classroom deletion logic when API is ready
    // deleteClassroomMutation.mutate(classroom.id)
  }

  if (isLoading) {
    return <div className="flex justify-center py-8">Loading classrooms...</div>
  }

  if (error) {
    return <div className="text-red-600 py-8">Error loading classrooms</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Classrooms</h3>
          <p className="text-sm text-gray-600">Manage your classrooms and student groups</p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Classroom
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Classrooms</CardTitle>
          <CardDescription>
            You have {classrooms.length} classroom(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {classrooms.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No classrooms yet</p>
              <Button onClick={() => setShowCreateDialog(true)} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Create your first classroom
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Major</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classrooms.map((classroom) => (
                  <TableRow key={classroom.id}>
                    <TableCell className="font-medium">{classroom.name}</TableCell>
                    <TableCell>{classroom.major}</TableCell>
                    <TableCell>{classroom.grade}</TableCell>
                    <TableCell className="max-w-xs truncate">{classroom.description}</TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {new Date(classroom.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditClassroom(classroom)}
                          className="h-8 w-8 p-0"
                          disabled={updateClassroomMutation.isPending}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteClassroom(classroom)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                          disabled={deleteClassroomMutation.isPending}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <CreateClassroomDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
      />
    </div>
  )
}

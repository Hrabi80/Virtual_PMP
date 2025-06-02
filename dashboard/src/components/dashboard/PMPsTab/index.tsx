
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

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

interface AllPMPsTabProps {
  pmps: PMP[]
}

export const AllPMPsTab = ({ pmps }: AllPMPsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>All PMPs</CardTitle>
        <CardDescription>
          Browse all available Problem-Based Learning cases in the system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Professor</TableHead>
                <TableHead>Classroom</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pmps.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    No PMPs available
                  </TableCell>
                </TableRow>
              ) : (
                pmps.map((pmp) => (
                  <TableRow key={pmp.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
                      <div>
                        <p className="font-semibold text-gray-900">{pmp.title}</p>
                        <p className="text-sm text-gray-500 mt-1">{pmp.annonceOfTheProblem}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-gray-600 max-w-xs truncate">
                        {pmp.description}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{pmp.professorName}</Badge>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-gray-600">{pmp.classroomName}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-gray-500">
                        {new Date(pmp.createdAt).toLocaleDateString()}
                      </p>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

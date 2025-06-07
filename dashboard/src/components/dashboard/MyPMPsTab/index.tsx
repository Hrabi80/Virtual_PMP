import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, Plus } from "lucide-react";
import { CreatePMPDialog } from "./CreatePMPDialog";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import { PMPTableRow } from "./PMPTableRow";
import { PMP } from "@/types/api";
import { usePMPs } from "@/hooks/api/usePMPs";

interface MyPMPsTabProps {
  professorId: string;
}

export const MyPMPsTab = ({ professorId }: MyPMPsTabProps) => {
  const { pmps, isLoading, deletePMP } = usePMPs();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPMP, setSelectedPMP] = useState<PMP | null>(null);
  const handleEdit = (pmp: PMP) => {
    setSelectedPMP(pmp);
    setShowCreateDialog(true);
  };

  const handleDelete = (pmp: PMP) => {
    setSelectedPMP(pmp);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedPMP) {
      deletePMP(selectedPMP.id);
      setDeleteDialogOpen(false);
      setSelectedPMP(null);
    }
  };

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
                  <TableHead>Problem</TableHead>
                  <TableHead>Classroom</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <div className="flex items-center justify-center h-[200px]">
                        <Loader2 className="h-8 w-8 animate-spin" />
                      </div>
                    </TableCell>
                  </TableRow>
                ) : !pmps || pmps.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-12">
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <div className="p-3 bg-gray-100 rounded-full">
                          <Plus className="h-6 w-6 text-gray-400" />
                        </div>
                        <div className="space-y-1">
                          <p className="font-medium text-gray-900">
                            No PMPs yet
                          </p>
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
                      onEdit={handleEdit}
                      onDelete={handleDelete}
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
        pmp={selectedPMP}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
        title={selectedPMP?.title || ""}
      />
    </>
  );
};

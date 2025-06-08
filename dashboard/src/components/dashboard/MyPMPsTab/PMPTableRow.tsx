import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PMP } from "@/types/api/index";

interface PMPTableRowProps {
  pmp: PMP;
  onEdit: (pmp: PMP) => void;
  onDelete: (pmp: PMP) => void;
}

export const PMPTableRow = ({
  pmp,
  onEdit,
  onDelete,
}: PMPTableRowProps) => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/pmp/${pmp.id}`);
  };

  return (
    <TableRow key={pmp.id} className="hover:bg-gray-50">
      <TableCell className="w-[200px]">
        <p className="font-semibold text-gray-900 truncate">{pmp.title}</p>
      </TableCell>
      <TableCell className="max-w-[300px]">
        <p className="text-sm text-gray-500 truncate" title={pmp.annonceOfTheProblem}>
          {pmp.annonceOfTheProblem}
        </p>
      </TableCell>
      <TableCell className="w-[200px]">
        <Badge variant="outline" className="px-4 py-2">
          {pmp.classroom?.name}
        </Badge>
      </TableCell>
      <TableCell className="w-[120px]">
        <p className="text-sm text-gray-500">
          {new Date(pmp.createdAt).toLocaleDateString()}
        </p>
      </TableCell>
      <TableCell className="w-[120px] text-right">
        <div className="flex items-center justify-end space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleView}
            className="h-8 w-8 p-0"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(pmp)}
            className="h-8 w-8 p-0"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(pmp)}
            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

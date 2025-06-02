import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Eye, Edit, Trash2, FolderPlus } from "lucide-react";
import { CategoryList } from "../Category";
import { useNavigate } from "react-router-dom";

interface Question {
  id: string;
  questionText: string;
  type: "NORMAL_QUESTION" | "ASK_FOR_MEDICAL_PICTURE";
  response: string;
  medicalPictureUrl?: string;
  score: number;
  questionCategoryId: string;
  createdAt: string;
}

interface Category {
  id: string;
  name: string;
  pmpId: string;
  questions: Question[];
}

interface PMP {
  id: string;
  title: string;
  description: string;
  annonceOfTheProblem: string;
  professorName: string;
  classroomName: string;
  createdBy: string;
  createdAt: string;
  isVisible?: boolean;
  categories?: Category[];
}

interface PMPTableRowProps {
  pmp: PMP;
  categories: Category[];
  onEdit: (pmp: PMP) => void;
  onDelete: (pmp: PMP) => void;
  onAddCategory: (pmp: PMP) => void;
  onManageQuestions: (category: Category) => void;
  onManageCategory: (category: Category) => void;
}

export const PMPTableRow = ({
  pmp,
  categories,
  onEdit,
  onDelete,
  onAddCategory,
  onManageQuestions,
  onManageCategory,
}: PMPTableRowProps) => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/pmp/${pmp.id}`);
  };

  const handleEdit = () => {
    navigate(`/pmp/${pmp.id}/edit`);
  };

  const actionButtons = (
    <div className="flex items-center space-x-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          handleView();
        }}
        className="h-8 w-8 p-0"
      >
        <Eye className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          handleEdit();
        }}
        className="h-8 w-8 p-0"
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          onAddCategory(pmp);
        }}
        className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700"
      >
        <FolderPlus className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(pmp);
        }}
        className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );

  if (categories.length === 0) {
    return (
      <TableRow key={pmp.id} className="hover:bg-gray-50">
        <TableCell className="font-medium">
          <div>
            <p className="font-semibold text-gray-900">{pmp.title}</p>
            <p className="text-sm text-gray-500 mt-1">
              {pmp.annonceOfTheProblem}
            </p>
          </div>
        </TableCell>
        <TableCell>
          <p className="text-sm text-gray-600 max-w-xs truncate">
            {pmp.description}
          </p>
        </TableCell>
        <TableCell>
          <Badge variant="outline">{pmp.classroomName}</Badge>
        </TableCell>
        <TableCell>
          <p className="text-sm text-gray-500">
            {new Date(pmp.createdAt).toLocaleDateString()}
          </p>
        </TableCell>
        <TableCell className="text-right">{actionButtons}</TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow key={pmp.id} className="hover:bg-gray-50">
      <TableCell colSpan={5} className="p-0">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value={pmp.id} className="border-0">
            <AccordionTrigger className="px-4 py-4 hover:no-underline">
              <div className="flex items-center justify-between w-full mr-4">
                <div className="flex items-start space-x-4">
                  <div>
                    <p className="font-semibold text-gray-900 text-left">
                      {pmp.title}
                    </p>
                    <p className="text-sm text-gray-500 mt-1 text-left">
                      {pmp.annonceOfTheProblem}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="outline">{pmp.classroomName}</Badge>
                  <p className="text-sm text-gray-500">
                    {new Date(pmp.createdAt).toLocaleDateString()}
                  </p>
                  {actionButtons}
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-3">
                <p className="text-sm text-gray-600">{pmp.description}</p>
                <CategoryList
                  categories={categories}
                  onManageQuestions={onManageQuestions}
                  onManageCategory={onManageCategory}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </TableCell>
    </TableRow>
  );
};

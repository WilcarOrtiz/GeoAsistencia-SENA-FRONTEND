"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import * as I from "lucide-react";
import { Subject } from "@/features/subject/subject.type";

export const createColumns = (
  onEdit: ((subject: Subject) => void) | undefined,
  onDelete: ((id: string) => void) | undefined,
): ColumnDef<Subject>[] => [
  { accessorKey: "code", header: "Código" },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nombre
        <I.ArrowUpDown className="w-4 m-4 ml-2" />
      </Button>
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const subject = row.original;
      if (!onEdit && !onDelete) return null;

      return (
        <div className="flex items-center gap-1">
          {onDelete && (
            <Button
              variant="ghost"
              size="icon"
              className="text-destructive hover:text-destructive"
              onClick={() => onDelete(subject.id)}
            >
              <I.Trash2 className="h-4 w-4" />
            </Button>
          )}

          {onEdit && (
            <Button
              variant="ghost"
              size="icon"
              className=" "
              onClick={() => onEdit(subject)}
            >
              <I.Pencil className="h-4 w-4" />
            </Button>
          )}
        </div>
      );
    },
  },
];

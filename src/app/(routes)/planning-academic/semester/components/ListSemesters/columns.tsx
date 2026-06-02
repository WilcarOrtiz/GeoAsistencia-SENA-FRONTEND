"use client";
import { format } from "date-fns";
import { Semester, SemesterState } from "@/features/semester/semester.type";
import { ColumnDef } from "@tanstack/react-table";
import {
  STATE_BADGE_VARIANT,
  STATE_LABELS,
} from "@/features/semester/semester.constants";
import { Badge } from "@/components/ui/badge";
import * as D from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import * as I from "lucide-react";

export const createColumns = (
  onEdit: ((semester: Semester) => void) | undefined,
  onChangeState: ((semester: Semester) => void) | undefined,
  onDelete: ((id: string) => void) | undefined,
): ColumnDef<Semester>[] => [
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
    accessorKey: "state",
    header: "Estado",
    cell: ({ row }) => {
      const state = row.getValue("state") as SemesterState;
      return (
        <Badge variant={STATE_BADGE_VARIANT[state]}>
          {STATE_LABELS[state]}
        </Badge>
      );
    },
  },
  {
    accessorKey: "startDate",
    header: "Inicio",
    cell: ({ row }) =>
      format(new Date(row.getValue("startDate")), "dd/MM/yyyy"),
  },
  {
    accessorKey: "endDate",
    header: "Fin",
    cell: ({ row }) => format(new Date(row.getValue("endDate")), "dd/MM/yyyy"),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const semester = row.original;
      const isLocked = ["finished", "canceled"].includes(semester.state);

      if (!onEdit && !onChangeState && !onDelete) return null;

      return (
        <div className="flex items-center gap-1">
          {onDelete && (
            <Button
              variant="ghost"
              size="icon"
              className="text-destructive hover:text-destructive"
              onClick={() => onDelete(semester.id)}
            >
              <I.Trash2 className="h-4 w-4" />
            </Button>
          )}

          {(onEdit || onChangeState) && (
            <D.DropdownMenu>
              <D.DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <I.MoreHorizontal className="h-4 w-4" />
                </Button>
              </D.DropdownMenuTrigger>
              <D.DropdownMenuContent align="end">
                <D.DropdownMenuLabel>Acciones</D.DropdownMenuLabel>

                {onEdit && (
                  <D.DropdownMenuItem
                    onClick={() => onEdit(semester)}
                    disabled={isLocked}
                  >
                    <I.Pencil className="mr-2 h-4 w-4" /> Editar
                  </D.DropdownMenuItem>
                )}

                {onChangeState && (
                  <D.DropdownMenuItem onClick={() => onChangeState(semester)}>
                    <I.RefreshCw className="mr-2 h-4 w-4" /> Cambiar estado
                  </D.DropdownMenuItem>
                )}
              </D.DropdownMenuContent>
            </D.DropdownMenu>
          )}
        </div>
      );
    },
  },
];

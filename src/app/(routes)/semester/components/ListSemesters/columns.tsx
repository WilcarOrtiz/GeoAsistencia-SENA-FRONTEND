"use client";
import { format } from "date-fns";
import { Semester, SemesterState } from "@/features/semester/semester.type";
import { ColumnDef } from "@tanstack/react-table";
import {
  STATE_BADGE_VARIANT,
  STATE_LABELS,
} from "@/features/semester/semester.constants";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal, Pencil, RefreshCw } from "lucide-react";

export const createColumns = (
  onEdit: (semester: Semester) => void,
  onChangeState: (semester: Semester) => void,
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
        <ArrowUpDown className="w-4 m-4 ml-2" />
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

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => onEdit(semester)}
              disabled={isLocked}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onChangeState(semester)}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Cambiar estado
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

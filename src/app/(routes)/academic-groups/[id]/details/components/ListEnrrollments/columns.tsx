"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

export type Enrollment = {
  id: string;
  full_name: string;
  enrollment_status: string;
  enrolled_at: string;
  attendance_percentage: number;
};

export const columns: ColumnDef<Enrollment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "full_name",
    header: "Estudiante",
  },

  {
    accessorKey: "enrollment_status",

    header: "Estado",

    cell: ({ row }) => {
      const status = row.original.enrollment_status;

      const variant =
        status === "ACTIVE"
          ? "default"
          : status === "MOVED"
            ? "secondary"
            : "destructive";

      return <Badge variant={variant}>{status}</Badge>;
    },
  },
  {
    accessorKey: "attendance_percentage",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Asistencia
        <ArrowUpDown className="w-4 m-4 ml-2" />
      </Button>
    ),

    cell: ({ row }) => {
      const value = row.original.attendance_percentage;

      let color = "";
      if (value >= 80) color = "text-green-600";
      else if (value >= 60) color = "text-yellow-600";
      else color = "text-red-600";

      return (
        <span className={`font-medium ${color}`}>{value.toFixed(1)}%</span>
      );
    },
  },

  {
    accessorKey: "enrolled_at",
    header: "Fecha ingreso",
    cell: ({ row }) => {
      const date = new Date(row.original.enrolled_at);
      return date.toLocaleDateString();
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const student = row.original;

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
              onClick={() => navigator.clipboard.writeText(student.id)}
            >
              Copiar ID
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem>Ver detalle</DropdownMenuItem>

            <DropdownMenuItem>Ver asistencia</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

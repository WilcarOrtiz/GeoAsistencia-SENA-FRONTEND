"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import * as I from "lucide-react";
import { User } from "@/features/User/user.type";
import { Badge } from "@/components/ui/badge";
import {
  ROLE_BADGE_VARIANT,
  ROLE_LABELS,
  RoleSystem,
} from "@/features/roleAndPermission/role.constants";

export const createColumns = (
  onEdit: (subject: User) => void,
): ColumnDef<User>[] => [
  { accessorKey: "ID_user", header: "Identificacion" },
  { accessorKey: "email", header: "Email" },
  {
    accessorKey: "first_name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Primer Nombre
        <I.ArrowUpDown className="w-4 m-4 ml-2" />
      </Button>
    ),
  },
  {
    accessorKey: "middle_name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Segundo Nombre
        <I.ArrowUpDown className="w-4 m-4 ml-2" />
      </Button>
    ),
  },
  {
    accessorKey: "last_name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Primer Apellido
        <I.ArrowUpDown className="w-4 m-4 ml-2" />
      </Button>
    ),
  },
  {
    accessorKey: "second_last_name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Segundo Apellido
        <I.ArrowUpDown className="w-4 m-4 ml-2" />
      </Button>
    ),
  },
  {
    id: "roles",
    header: "Roles",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex flex-wrap gap-1">
          {user.roles.map((role) => (
            <Badge
              key={role.id}
              variant={ROLE_BADGE_VARIANT[role.name as RoleSystem]}
            >
              {ROLE_LABELS[role.name as RoleSystem]}
            </Badge>
          ))}
        </div>
      );
    },

    accessorFn: (row) => row.roles.map((r) => r.name),
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue) return true;
      const roles: RoleSystem[] = row.getValue(columnId);
      return roles.includes(filterValue as RoleSystem);
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className=" "
            onClick={() => onEdit(user)}
          >
            <I.Pencil className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];

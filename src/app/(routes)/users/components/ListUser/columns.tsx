"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import * as I from "lucide-react";
import { User } from "@/features/User/user.type";
import { Badge } from "@/components/ui/badge";
import {
  ROLE_BADGE_VARIANT,
  ROLE_LABELS,
  RoleSystem,
} from "@/features/roleAndPermission/role.constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export const createColumns = (
  onSendRecoveryEmail: (user: User) => void,
  onEdit: (user: User) => void,
  onChangeState: (user: User) => void,
  onResetDevices: (user: User) => void,
): ColumnDef<User>[] => [
  // ── Columna de selección ──────────────────────────────────────────────────
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Seleccionar todos"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Seleccionar fila"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  // ── Columnas de datos ─────────────────────────────────────────────────────
  {
    accessorKey: "is_active",
    header: " ",
    filterFn: (row, columnId, filterValue) => {
      if (filterValue === "" || filterValue === "all") return true;
      const isActive = row.getValue(columnId) as boolean;
      return filterValue === "true" ? isActive : !isActive;
    },
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center justify-start gap-2">
          <span
            className={cn(
              "h-2 w-2 rounded-full shrink-0",
              user.is_active ? "bg-status-active" : "bg-status-inactive",
            )}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "ID_user",
    header: "Identificacion",
  },
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

  // ── Acciones individuales ─────────────────────────────────────────────────
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <I.MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onEdit(user)}>
                <I.Pencil className="mr-2 h-4 w-4" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onChangeState(user)}>
                <I.RefreshCw className="mr-2 h-4 w-4" />
                {!user.is_active ? "Habilitar" : "Inhabilitar"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSendRecoveryEmail(user)}>
                <I.Mail className="mr-2 h-4 w-4" />
                Enviar recuperación
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onResetDevices(user)}
                className="text-destructive focus:text-destructive"
              >
                <I.SmartphoneNfc className="mr-2 h-4 w-4" />
                Resetear dispositivo
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

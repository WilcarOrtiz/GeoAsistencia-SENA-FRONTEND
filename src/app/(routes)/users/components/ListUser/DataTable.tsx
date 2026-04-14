"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Input } from "@/components/ui/input";

import { Pagination } from "@/components/shared/Pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ROLE_LABELS,
  ROLE_SYSTEM_KEYS,
} from "@/features/roleAndPermission/role.constants";
import { GenericSelect } from "@/components/shared/select";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  total: number;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
  emailInput: string;
  role: string;
  isActive: string;
  onEmailChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onIsActiveChange: (value: string) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  total,
  page,
  limit,
  onPageChange,
  emailInput,
  role,
  isActive,
  onEmailChange,
  onRoleChange,
  onIsActiveChange,
}: DataTableProps<TData, TValue>) {
  const totalPages = Math.ceil(total / limit);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    state: { sorting, columnVisibility },
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end gap-3 py-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">Correo</span>
          <Input
            placeholder="Filtrar correo..."
            value={emailInput}
            onChange={(e) => onEmailChange(e.target.value)}
            className="w-full sm:w-[240px]"
          />
        </div>

        <div className="flex gap-3 flex-col xs:flex-row sm:flex-row">
          {/* Filtro según rol */}
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">Rol</span>

            <GenericSelect
              options={[
                { label: "Todos", value: "all" },
                ...ROLE_SYSTEM_KEYS.map((roleKey) => ({
                  label: ROLE_LABELS[roleKey],
                  value: roleKey,
                })),
              ]}
              defaultValue={role || "all"} // 👈 controlado
              onSelect={onRoleChange}
              placeholder="Todos los roles"
            />
          </div>

          {/* Filtro de estado */}
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">Estado</span>
            <Select value={isActive || "all"} onValueChange={onIsActiveChange}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="true">Activos</SelectItem>
                <SelectItem value="false">Inactivos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}

"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  RowSelectionState,
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
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Mail,
  SmartphoneNfc,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { useState } from "react";
import { Pagination } from "@/components/shared/Pagination";
import { UserTableFilters } from "./UserTableFilters";
import { User } from "@/features/User/user.type";

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
  // selección múltiple
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
  // acciones masivas
  onBulkSendRecoveryEmail: () => Promise<void>;
  onBulkChangeState: (activate: boolean) => Promise<void>;
  onBulkResetDevices: () => Promise<void>;
  isSendingEmails: boolean;
  isChangingState: boolean;
  isResettingDevices: boolean;
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
  selectedIds,
  onSelectionChange,
  onBulkSendRecoveryEmail,
  onBulkChangeState,
  onBulkResetDevices,
  isSendingEmails,
  isChangingState,
  isResettingDevices,
}: DataTableProps<TData, TValue>) {
  const totalPages = Math.ceil(total / limit);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  // Construir rowSelection a partir del array de ids del hook
  const rowSelection: RowSelectionState = (data as User[]).reduce(
    (acc, user, index) => {
      if (selectedIds.includes(user.auth_id)) acc[index] = true;
      return acc;
    },
    {} as RowSelectionState,
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: (updater) => {
      // Resolver el nuevo estado de selección
      const newSelection =
        typeof updater === "function" ? updater(rowSelection) : updater;

      // Mapear índices seleccionados → auth_ids
      const newIds = Object.keys(newSelection)
        .filter((key) => newSelection[key])
        .map((index) => (data[Number(index)] as User).auth_id);

      onSelectionChange(newIds);
    },
    state: { sorting, columnVisibility, rowSelection },
    enableRowSelection: true,
  });

  const hasSelection = selectedIds.length > 0;
  const isBusy = isSendingEmails || isChangingState || isResettingDevices;

  return (
    <div>
      <UserTableFilters
        emailInput={emailInput}
        role={role}
        isActive={isActive}
        onEmailChange={onEmailChange}
        onRoleChange={onRoleChange}
        onIsActiveChange={onIsActiveChange}
      />

      {/* ── Barra de acciones masivas ──────────────────────────────────────── */}
      <div
        className={`flex items-center justify-between gap-3 rounded-md border px-3 py-2 mb-2 transition-all duration-200 ${
          hasSelection
            ? "bg-muted/60 border-border"
            : "bg-transparent border-transparent"
        }`}
      >
        <span className="text-sm text-muted-foreground min-w-[120px]">
          {hasSelection
            ? `${selectedIds.length} usuario(s) seleccionado(s)`
            : "Ninguno seleccionado"}
        </span>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Enviar correo de recuperación */}
          <Button
            variant="outline"
            size="sm"
            disabled={!hasSelection || isBusy}
            onClick={onBulkSendRecoveryEmail}
            className="flex items-center gap-2"
          >
            {isSendingEmails ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Mail className="h-4 w-4" />
            )}
            Enviar recuperación
            {hasSelection && (
              <span className="ml-1 text-xs">({selectedIds.length})</span>
            )}
          </Button>

          {/* Habilitar */}
          <Button
            variant="outline"
            size="sm"
            disabled={!hasSelection || isBusy}
            onClick={() => onBulkChangeState(true)}
            className="flex items-center gap-2"
          >
            {isChangingState ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ToggleRight className="h-4 w-4 text-green-600" />
            )}
            Habilitar
            {hasSelection && (
              <span className="ml-1 text-xs">({selectedIds.length})</span>
            )}
          </Button>

          {/* Inhabilitar */}
          <Button
            variant="outline"
            size="sm"
            disabled={!hasSelection || isBusy}
            onClick={() => onBulkChangeState(false)}
            className="flex items-center gap-2"
          >
            {isChangingState ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ToggleLeft className="h-4 w-4 text-orange-500" />
            )}
            Inhabilitar
            {hasSelection && (
              <span className="ml-1 text-xs">({selectedIds.length})</span>
            )}
          </Button>

          {/* Resetear dispositivos */}
          <Button
            variant="destructive"
            size="sm"
            disabled={!hasSelection || isBusy}
            onClick={onBulkResetDevices}
            className="flex items-center gap-2"
          >
            {isResettingDevices ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <SmartphoneNfc className="h-4 w-4" />
            )}
            Resetear dispositivos
            {hasSelection && (
              <span className="ml-1 text-xs">({selectedIds.length})</span>
            )}
          </Button>
        </div>
      </div>

      {/* ── Tabla ─────────────────────────────────────────────────────────── */}
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
                  className={row.getIsSelected() ? "bg-muted/40" : ""}
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

      {/* ── Footer: contador + paginación ────────────────────────────────── */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <span className="text-sm text-muted-foreground">
          {selectedIds.length} de {total} fila(s) seleccionadas.
        </span>
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}

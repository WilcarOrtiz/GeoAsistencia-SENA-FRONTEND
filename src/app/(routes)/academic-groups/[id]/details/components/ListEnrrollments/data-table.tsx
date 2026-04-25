"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight, Loader2, UserMinus } from "lucide-react";
import { useState } from "react";
import { Enrollment } from "./columns";
import { TransferModal } from "./TransferModal";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  groupId: string;
  onTransfer: (studentIds: string[], toGroupId: string) => Promise<void>;
  onRemove: (studentIds: string[]) => Promise<void>;
  isTransferring: boolean;
  isRemoving: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  groupId,
  onTransfer,
  onRemove,
  isTransferring,
  isRemoving,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [transferOpen, setTransferOpen] = useState(false);

  const table = useReactTable({
    data,
    columns,
    state: { columnFilters, rowSelection },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
  });

  const selectedIds = table
    .getFilteredSelectedRowModel()
    .rows.map((r) => (r.original as Enrollment).id);

  const hasSelection = selectedIds.length > 0;

  const handleRemove = async () => {
    await onRemove(selectedIds);
    table.resetRowSelection();
  };

  const handleTransfer = async (toGroupId: string) => {
    await onTransfer(selectedIds, toGroupId);
    table.resetRowSelection();
  };

  return (
    <div className="overflow-hidden rounded-md border">
      {/* TOOLBAR */}
      <div className="flex items-center justify-between gap-3 p-3">
        <Input
          placeholder="Filtrar por nombre"
          value={
            (table.getColumn("full_name")?.getFilterValue() as string) ?? ""
          }
          onChange={(e) =>
            table.getColumn("full_name")?.setFilterValue(e.target.value)
          }
          className="max-w-sm"
        />

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            disabled={!hasSelection || isTransferring}
            onClick={() => setTransferOpen(true)}
          >
            <ArrowLeftRight className="h-4 w-4" />
            Transferir
            {hasSelection && (
              <span className="ml-1 text-xs">({selectedIds.length})</span>
            )}
          </Button>

          <Button
            variant="destructive"
            size="sm"
            className="flex items-center gap-2"
            disabled={!hasSelection || isRemoving}
            onClick={handleRemove}
          >
            {isRemoving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <UserMinus className="h-4 w-4" />
            )}
            Dar de baja
            {hasSelection && (
              <span className="ml-1 text-xs">({selectedIds.length})</span>
            )}
          </Button>
        </div>
      </div>

      {/* TABLE */}
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
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Sin estudiantes registrados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* FOOTER */}
      <div className="flex items-center justify-between gap-4 border-t px-3 py-3">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} fila(s) seleccionadas.
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
      </div>

      <TransferModal
        open={transferOpen}
        onClose={() => setTransferOpen(false)}
        selectedCount={selectedIds.length}
        currentGroupId={groupId}
        isLoading={isTransferring}
        onConfirm={handleTransfer}
      />
    </div>
  );
}

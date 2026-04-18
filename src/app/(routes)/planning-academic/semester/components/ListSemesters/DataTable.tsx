"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import * as T from "@/components/ui/table";
import { useState } from "react";
import { Pagination } from "@/components/shared/Pagination";
import { DataTableFilters } from "./DataTableFilters";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  total: number;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  total,
  page,
  limit,
  onPageChange,
}: DataTableProps<TData, TValue>) {
  const totalPages = Math.ceil(total / limit);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: { sorting, columnFilters, columnVisibility },
  });

  return (
    <div>
      <DataTableFilters table={table} />
      <div className="overflow-hidden rounded-md border">
        <T.Table>
          <T.TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <T.TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <T.TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </T.TableHead>
                ))}
              </T.TableRow>
            ))}
          </T.TableHeader>
          <T.TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <T.TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <T.TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </T.TableCell>
                  ))}
                </T.TableRow>
              ))
            ) : (
              <T.TableRow>
                <T.TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </T.TableCell>
              </T.TableRow>
            )}
          </T.TableBody>
        </T.Table>
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}

"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table } from "@tanstack/react-table";
import {
  SEMESTER_STATES,
  STATE_LABELS,
} from "@/features/semester/semester.constants";

type Props<TData> = {
  table: Table<TData>;
};

export function DataTableFilters<TData>({ table }: Props<TData>) {
  return (
    <div className="flex items-center gap-4 py-4">
      {/* 🔍 BUSCADOR */}
      <Input
        placeholder="Filtrar por nombre o codigo..."
        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("name")?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />

      {/* 🎯 FILTRO POR ESTADO */}
      <Select
        value={(table.getColumn("state")?.getFilterValue() as string) ?? ""}
        onValueChange={(value) =>
          table.getColumn("state")?.setFilterValue(value === "all" ? "" : value)
        }
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          {SEMESTER_STATES.map((state) => (
            <SelectItem key={state} value={state}>
              {STATE_LABELS[state]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* 🧩 COLUMNAS */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto">
            Columnas
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

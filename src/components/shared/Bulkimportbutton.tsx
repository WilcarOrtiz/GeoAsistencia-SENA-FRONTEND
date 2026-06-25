"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Upload } from "lucide-react";
import { apiClient } from "@/lib/api/api_client";
import { toast } from "sonner";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiResponse } from "@/types";

type BulkImportData = {
  created: number;
  failed: FailedRow[];
};

type FailedRow = {
  row: number;
  code?: string;
  errors: string[];
};

type BulkImportButtonProps = {
  endpoint: string;
  queryKey: string | string[];
  extraQueryKeys?: string[][];
  label?: string;
};

export function BulkImportButton({
  endpoint,
  queryKey,
  extraQueryKeys,
  label = "Importar",
}: BulkImportButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const { mutate: importFile, isPending } = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await apiClient.post<ApiResponse<BulkImportData>>(
        endpoint,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      return data;
    },
    onSuccess: (res) => {
      const { created, failed } = res.data ?? res;

      const allKeys = [
        Array.isArray(queryKey) ? queryKey : [queryKey],
        ...(extraQueryKeys ?? []),
      ];

      allKeys.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key }),
      );

      if (failed?.length > 0) {
        toast.warning(
          `Se importaron ${created} registro(s). ${failed.length} fila(s) con errores.`,
          {
            description: failed
              .map(
                (f: FailedRow) =>
                  `Fila ${f.row}${f.code ? ` (${f.code})` : ""}: ${f.errors.join(", ")}`,
              )
              .join("\n"),
            duration: 8000,
          },
        );
      } else {
        toast.success(`registro(s) importado(s) correctamente.`);
      }
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const serverErrors = error.response?.data?.errors;
        if (Array.isArray(serverErrors) && serverErrors.length > 0) {
          toast.error("El archivo contiene errores de validación", {
            description: serverErrors
              .map(
                (e: { row: number; errors: string[] }) =>
                  `Fila ${e.row}: ${e.errors.join(", ")}`,
              )
              .join("\n"),
            duration: 8000,
          });
        } else {
          toast.error(
            error.response?.data?.message ?? "Error al importar el archivo",
          );
        }
      }
    },
    onSettled: () => {
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
  });

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) importFile(file);
        }}
      />
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={() => fileInputRef.current?.click()}
        disabled={isPending}
      >
        {isPending ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Upload className="h-5 w-5" />
        )}
        {isPending ? "Importando..." : label}
      </Button>
    </>
  );
}

"use client";

import { Semester } from "@/features/semester/semester.type";
import { createColumns } from "./columns";
import { DataTable } from "./date-table";
import { apiClient } from "@/lib/api/api_client";
import { useEffect, useState, useMemo, useCallback } from "react";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { PaginatedData } from "@/types/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { FormChangeState } from "../FormChangeState/FormChangeState";
import { FormSemester } from "../FormSemester";
import { AlertDialogDestructive } from "@/components/shared/AlertDialogDestructive";
import { toast } from "sonner";
import { AxiosError } from "axios";

export default function ListSemesters() {
  const [data, setData] = useState<Semester[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [semesterToDelete, setSemesterToDelete] = useState<string | null>(null);
  const limit = 10;

  // Modal edición
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState<
    Semester | undefined
  >();

  // Modal cambio de estado
  const [openState, setOpenState] = useState(false);
  const [semesterForState, setSemesterForState] = useState<
    Semester | undefined
  >();

  const fetchData = useCallback(async () => {
    try {
      const { data } = await apiClient.get<PaginatedData<Semester>>(
        `/semester?page=${page}&limit=${limit}`,
      );
      setData(data.data);
      setTotal(data.total);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleEdit = useCallback((semester: Semester) => {
    setSelectedSemester(semester);
    setOpenEdit(true);
  }, []);

  const handleChangeState = useCallback((semester: Semester) => {
    setSemesterForState(semester);
    setOpenState(true);
  }, []);

  const handleDelete = async () => {
    if (!semesterToDelete) return;
    try {
      const res = await apiClient.delete(`/semester/${semesterToDelete}`);
      setSemesterToDelete(null);

      toast.success("Acción Realizada", {
        description: res.message,
        position: "top-center",
      });

      fetchData();
    } catch (error) {
      setSemesterToDelete(null);
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message ?? "No se pudo eliminar el semestre",
        );
      }
    }
  };

  const columns = useMemo(
    () => createColumns(handleEdit, handleChangeState, setSemesterToDelete),
    [handleEdit, handleChangeState],
  );

  if (isLoading) return <TableSkeleton />;

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={data}
        total={total}
        page={page}
        limit={limit}
        onPageChange={setPage}
      />

      {/* Modal editar */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Semestre</DialogTitle>
          </DialogHeader>
          {selectedSemester && (
            <FormSemester
              setOpenModalCreate={setOpenEdit}
              semester={selectedSemester}
              onSuccess={fetchData}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Modal cambiar estado */}
      <Dialog open={openState} onOpenChange={setOpenState}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Cambiar Estado</DialogTitle>
          </DialogHeader>
          {semesterForState && (
            <FormChangeState
              semester={semesterForState}
              setOpen={setOpenState}
              onSuccess={fetchData}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Modal eliminar */}

      <AlertDialogDestructive
        open={!!semesterToDelete}
        onOpenChange={() => setSemesterToDelete(null)}
        onConfirm={handleDelete}
        title="¿Eliminar semestre?"
        description="Ten en cuenta que esta acción no se puede deshacer, así que verifica antes de continuar."
      />
    </div>
  );
}

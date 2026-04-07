"use client";

import { useMemo } from "react";
import { HeaderSemester } from "./components/HeaderSemester/HeaderSemester";
import { createColumns } from "./components/ListSemesters/columns";
import { DataTable } from "./components/ListSemesters/DataTable";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormChangeState } from "./components/FormChangeState/FormChangeState";
import { FormSemester } from "./components/FormSemester";
import { AlertDialogDestructive } from "@/components/shared/AlertDialogDestructive";
import { useSemesters } from "./hooks/useSemesters";

export default function SemesterPage() {
  const {
    semesters,
    total,
    isLoading,
    page,
    limit,
    setPage,
    modal,
    openModal,
    closeModal,
    handleDelete,
    refreshData,
  } = useSemesters();

  const columns = useMemo(
    () =>
      createColumns(
        (semester) => openModal("edit", semester),
        (semester) => openModal("changeState", semester),
        (id) => openModal("delete", { id } as never)
      ),
    [openModal]
  );

  return (
    <div>
      <HeaderSemester onCreateClick={() => openModal("create")} />

      <div className="container mx-auto py-10">
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <DataTable
            columns={columns}
            data={semesters}
            total={total}
            page={page}
            limit={limit}
            onPageChange={setPage}
          />
        )}
      </div>

      {/* Modal Crear/Editar */}
      <Dialog
        open={modal.type === "create" || modal.type === "edit"}
        onOpenChange={(open) => !open && closeModal()}
      >
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>
              {modal.type === "edit" ? "Editar Semestre" : "Crear un semestre"}
            </DialogTitle>
            {modal.type === "create" && (
              <DialogDescription>
                Crea y configura un semestre academico
              </DialogDescription>
            )}
          </DialogHeader>
          <FormSemester
            semester={modal.semester}
            onSuccess={refreshData}
            onClose={closeModal}
          />
        </DialogContent>
      </Dialog>

      {/* Modal Cambiar Estado */}
      <Dialog
        open={modal.type === "changeState"}
        onOpenChange={(open) => !open && closeModal()}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Cambiar Estado</DialogTitle>
          </DialogHeader>
          {modal.semester && (
            <FormChangeState
              semester={modal.semester}
              onSuccess={refreshData}
              onClose={closeModal}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Modal Eliminar */}
      <AlertDialogDestructive
        open={modal.type === "delete"}
        onOpenChange={closeModal}
        onConfirm={handleDelete}
        title="Eliminar semestre?"
        description="Ten en cuenta que esta accion no se puede deshacer, asi que verifica antes de continuar."
      />
    </div>
  );
}

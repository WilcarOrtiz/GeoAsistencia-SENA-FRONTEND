"use client";

import { useMemo } from "react";

import { createColumns } from "./components/ListSubject/columns";
import { DataTable } from "./components/ListSubject/DataTable";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { AlertDialogDestructive } from "@/components/shared/AlertDialogDestructive";

import { FormSubject } from "./components/FormSubject";
import { HeaderSubject } from "./components/HeaderSubject/HeaderSubject";
import { useSubjects } from "./hooks";

export default function SubjectPage() {
  const {
    subjects,
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
  } = useSubjects();

  const columns = useMemo(
    () =>
      createColumns(
        (subject) => openModal("edit", subject),
        (id) => openModal("delete", { id } as never),
      ),
    [openModal],
  );

  return (
    <div>
      <HeaderSubject onCreateClick={() => openModal("create")} />

      <div className="container mx-auto py-10">
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <DataTable
            columns={columns}
            data={subjects}
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
              {modal.type === "edit"
                ? "Editar materia"
                : "Registrar una materia"}
            </DialogTitle>
            {modal.type === "create" && (
              <DialogDescription>
                Crea y configura una nueva materia academica
              </DialogDescription>
            )}
          </DialogHeader>
          <FormSubject
            subject={modal.subject}
            onSuccess={refreshData}
            onClose={closeModal}
          />
        </DialogContent>
      </Dialog>

      {/* Modal Eliminar */}
      <AlertDialogDestructive
        open={modal.type === "delete"}
        onOpenChange={closeModal}
        onConfirm={handleDelete}
        title="Eliminar asignatura?"
        description="Ten en cuenta que esta accion no se puede deshacer, asi que verifica antes de continuar."
      />
    </div>
  );
}

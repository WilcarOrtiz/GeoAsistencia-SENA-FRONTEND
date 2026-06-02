"use client";

import { useMemo } from "react";
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
import { ManagementHeader } from "@/components/shared/ ManagementHeader";
import { CirclePlus } from "lucide-react";
import { Can } from "@/components/shared/Can";
import { usePermissions } from "@/hooks/usePermission";
import { PERMISSIONS } from "@/constants/permissions";

export default function SemesterPage() {
  const { can } = usePermissions();

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
        can(PERMISSIONS.EDITAR_SEMESTRE)
          ? (semester) => openModal("edit", semester)
          : undefined,
        can(PERMISSIONS.CAMBIAR_ESTADO_SEMESTRE)
          ? (semester) => openModal("changeState", semester)
          : undefined,
        can(PERMISSIONS.ELIMINAR_SEMESTRE)
          ? (id) => openModal("delete", { id } as never)
          : undefined,
      ),
    [can, openModal],
  );

  return (
    <div className="flex flex-1 flex-col">
      <ManagementHeader
        title="Gestion semestres"
        description="Crea, actualiza y cambia el estado a los semestres academicos"
        buttonLabel={
          can(PERMISSIONS.CREAR_SEMESTRE) ? "Agregar nuevo semestre" : undefined
        }
        buttonIcon={CirclePlus}
        onButtonClick={() => openModal("create")}
      />

      <div className="pl-10 pr-10">
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <Can permission={PERMISSIONS.VER_SEMESTRES}>
            <DataTable
              columns={columns}
              data={semesters}
              total={total}
              page={page}
              limit={limit}
              onPageChange={setPage}
            />
          </Can>
        )}
      </div>

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

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
import { useSubjects } from "./hooks";
import { DownloadTemplateLink } from "@/components/shared/TemplateDownload";
import { CirclePlus } from "lucide-react";
import { ManagementHeader } from "@/components/shared/ ManagementHeader";
import { BulkImportButton } from "@/components/shared/Bulkimportbutton";
import { Can } from "../../../../components/shared/Can";
import { PERMISSIONS } from "@/constants/permissions";
import { usePermissions } from "@/hooks/usePermission";

export default function SubjectPage() {
  const { can } = usePermissions();

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
        can(PERMISSIONS.EDITAR_ASIGNATURA)
          ? (subject) => openModal("edit", subject)
          : undefined,

        can(PERMISSIONS.ELIMINAR_ASIGNATURA)
          ? (id) => openModal("delete", { id } as never)
          : undefined,
      ),
    [can, openModal],
  );

  return (
    <div>
      <ManagementHeader
        title="Gestion Asignatura"
        description="Crea, actualiza y elimina las materias academicas."
        buttonLabel={
          can(PERMISSIONS.CREAR_ASIGNATURA)
            ? "Agregar nueva asignatura"
            : undefined
        }
        buttonIcon={CirclePlus}
        onButtonClick={() => openModal("create")}
        extraActions={
          <Can permission={PERMISSIONS.IMPORTAR_ASIGNATURAS}>
            <BulkImportButton
              endpoint="/subjects/bulk/import"
              queryKey="subjects"
            />
          </Can>
        }
      />

      <div className="pl-10 pr-10">
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <Can permission={PERMISSIONS.VER_ASIGNATURAS}>
            <DataTable
              columns={columns}
              data={subjects}
              total={total}
              page={page}
              limit={limit}
              onPageChange={setPage}
            />
          </Can>
        )}

        <Can permission={PERMISSIONS.DESCARGAR_PLANTILLA_ASIGNATURAS}>
          <div className="mt-4">
            <DownloadTemplateLink
              endpoint="/subjects/bulk/template"
              label="Asignaturas"
            />
          </div>
        </Can>
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

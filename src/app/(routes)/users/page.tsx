"use client";

import { useMemo } from "react";
import { createColumns } from "./components/ListUser/columns";
import { DataTable } from "./components/ListUser/DataTable";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { useUsers } from "./hooks";
import { DownloadTemplateLink } from "@/components/shared/TemplateDownload";
import { ManagementHeader } from "@/components/shared/ ManagementHeader";
import { UserRoundPlus } from "lucide-react";
import { BulkImportButton } from "@/components/shared/Bulkimportbutton";
import { apiClient } from "@/lib/api/api_client";
import { toast } from "sonner";
import { Can } from "../../../components/shared/Can";
import { PERMISSIONS } from "@/constants/permissions";
import { usePermissions } from "@/hooks/usePermission";

export default function UserPage() {
  const { can } = usePermissions();

  const {
    users,
    total,
    isLoading,
    page,
    limit,
    setPage,
    handleCreate,
    handleSendRecoveryEmail,
    handleEdit,
    handleChangeState,
    emailInput,
    role,
    isActive,
    handleEmailSearch,
    handleRoleFilter,
    handleIsActiveFilter,

    selectedIds,
    setSelectedIds,

    handleBulkSendRecoveryEmail,
    handleBulkChangeState,
    handleBulkResetDevices,
    isSendingEmails,
    isChangingState,
    isResettingDevices,
  } = useUsers();

  const handleResetDevices = useMemo(
    () => async (user: { auth_id: string }) => {
      try {
        await apiClient.patch("/user/reset-devices", {
          userIds: [user.auth_id],
        });
        toast.success("Dispositivo restablecido correctamente");
      } catch (error: unknown) {
        const msg =
          (error as { response?: { data?: { message?: string } } })?.response
            ?.data?.message ?? "Error al restablecer el dispositivo";
        toast.error(msg);
      }
    },
    [],
  );
  const columns = useMemo(
    () =>
      createColumns(
        can(PERMISSIONS.RECUPERAR_PASSWORD)
          ? handleSendRecoveryEmail
          : undefined,
        can(PERMISSIONS.EDITAR_USUARIO) ? handleEdit : undefined,
        can(PERMISSIONS.ACTIVAR_USUARIO) || can(PERMISSIONS.DESACTIVAR_USUARIO)
          ? handleChangeState
          : undefined,
        can(PERMISSIONS.RECUPERAR_PASSWORD) ? handleResetDevices : undefined,
      ),
    [
      can,
      handleSendRecoveryEmail,
      handleEdit,
      handleChangeState,
      handleResetDevices,
    ],
  );

  return (
    <div>
      <ManagementHeader
        title="Gestión Usuario"
        description="Gestiona todo lo referente a los usuarios, incluyendo la asignacion de roles"
        buttonLabel={
          can(PERMISSIONS.CREAR_USUARIO) ? "Agregar nuevo usuario" : undefined
        }
        buttonIcon={UserRoundPlus}
        onButtonClick={handleCreate}
        extraActions={
          <Can permission={PERMISSIONS.IMPORTAR_USUARIOS}>
            <BulkImportButton endpoint="/user/bulk/import" queryKey="users" />
          </Can>
        }
      />

      <div className="pl-10 pr-10">
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <Can permission={PERMISSIONS.VER_USUARIOS}>
            <DataTable
              columns={columns}
              data={users}
              total={total}
              page={page}
              limit={limit}
              onPageChange={setPage}
              emailInput={emailInput}
              role={role}
              isActive={isActive}
              onEmailChange={handleEmailSearch}
              onRoleChange={handleRoleFilter}
              onIsActiveChange={handleIsActiveFilter}
              selectedIds={selectedIds}
              onSelectionChange={setSelectedIds}
              onBulkSendRecoveryEmail={handleBulkSendRecoveryEmail}
              onBulkChangeState={handleBulkChangeState}
              onBulkResetDevices={handleBulkResetDevices}
              isSendingEmails={isSendingEmails}
              isChangingState={isChangingState}
              isResettingDevices={isResettingDevices}
            />
          </Can>
        )}
        <Can permission={PERMISSIONS.DESCARGAR_PLANTILLA_USUARIOS}>
          <div className="mt-4">
            <DownloadTemplateLink
              endpoint="/user/bulk/template"
              label="Usuarios"
            />
          </div>
        </Can>
      </div>
    </div>
  );
}

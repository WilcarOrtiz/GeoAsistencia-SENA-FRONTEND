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

export default function UserPage() {
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
    // selección múltiple
    selectedIds,
    setSelectedIds,
    // acciones masivas
    handleBulkSendRecoveryEmail,
    handleBulkChangeState,
    handleBulkResetDevices,
    isSendingEmails,
    isChangingState,
    isResettingDevices,
  } = useUsers();

  // Acción individual reset dispositivo (desde el dropdown de fila)
  const handleResetDevices = useMemo(
    () => async (user: { auth_id: string }) => {
      try {
        // apiClient.patch devuelve response.data; Axios lanza en 4xx/5xx.
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
        handleSendRecoveryEmail,
        handleEdit,
        handleChangeState,
        handleResetDevices,
      ),
    [
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
        buttonLabel="Agregar nuevo usuario"
        buttonIcon={UserRoundPlus}
        onButtonClick={handleCreate}
        extraActions={
          <BulkImportButton endpoint="/user/bulk/import" queryKey="users" />
        }
      />

      <div className="pl-10 pr-10">
        {isLoading ? (
          <TableSkeleton />
        ) : (
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
            // selección múltiple
            selectedIds={selectedIds}
            onSelectionChange={setSelectedIds}
            // acciones masivas
            onBulkSendRecoveryEmail={handleBulkSendRecoveryEmail}
            onBulkChangeState={handleBulkChangeState}
            onBulkResetDevices={handleBulkResetDevices}
            isSendingEmails={isSendingEmails}
            isChangingState={isChangingState}
            isResettingDevices={isResettingDevices}
          />
        )}
        <div className="mt-4">
          {" "}
          <DownloadTemplateLink
            endpoint="/user/bulk/template"
            label="Usuarios"
          />
        </div>
      </div>
    </div>
  );
}

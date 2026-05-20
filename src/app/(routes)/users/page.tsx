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
  } = useUsers();

  const columns = useMemo(
    () => createColumns(handleSendRecoveryEmail, handleEdit, handleChangeState),
    [handleSendRecoveryEmail, handleEdit, handleChangeState],
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

<div className="container mx-auto py-10"></div>;

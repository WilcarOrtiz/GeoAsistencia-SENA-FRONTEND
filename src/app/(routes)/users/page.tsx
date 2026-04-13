"use client";

import { useMemo } from "react";
import { createColumns } from "./components/ListUser/columns";
import { DataTable } from "./components/ListUser/DataTable";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { useUsers } from "./hooks";
import { HeaderUserManagement } from "./components/HeaderUserManagement";

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
      <HeaderUserManagement onCreateClick={handleCreate} />

      <div className="container mx-auto py-10">
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
      </div>
    </div>
  );
}

<div className="container mx-auto py-10"></div>;

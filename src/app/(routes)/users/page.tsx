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
    handleEdit,
    handleChangeState,
  } = useUsers();

  const columns = useMemo(
    () => createColumns(handleEdit, handleChangeState),
    [handleEdit, handleChangeState],
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
          />
        )}
      </div>
    </div>
  );
}

<div className="container mx-auto py-10"></div>;

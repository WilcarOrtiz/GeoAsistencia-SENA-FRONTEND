"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/api_client";
import { PaginatedData } from "@/types/api";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { Input } from "@/components/ui/input";
import { Permission } from "@/features/roleAndPermission/roleAndPermission.type";
import { PermissionMatrix } from "../PermissionMatrix/PermissionMatrix";
import { Pagination } from "@/components/shared/Pagination";
import { useRoles } from "@/hooks/ApiList";

const LIMIT = 14;

export default function ListRolesAndPermission() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data: roles, loading: loadingRoles } = useRoles();

  const { data, isLoading } = useQuery<PaginatedData<Permission>>({
    queryKey: ["permissions-matrix", page],
    queryFn: () =>
      apiClient
        .get<
          PaginatedData<Permission>
        >(`/permissions/matrix?page=${page}&limit=${LIMIT}`)
        .then((res) => res.data),
  });

  const permissions = data?.data ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / LIMIT);

  const filtered = permissions.filter(
    (p) =>
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (isLoading || loadingRoles) return <TableSkeleton />;

  return (
    <div className="space-y-4">
      <Input
        placeholder="Filtrar permiso..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />
      <PermissionMatrix permissions={filtered} roles={roles} page={page} />
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}

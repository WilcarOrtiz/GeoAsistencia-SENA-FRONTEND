"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api/api_client";
import { PaginatedData } from "@/types/api";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { Input } from "@/components/ui/input";
import { Permission } from "@/features/roleAndPermission/roleAndPermission.type";
import { PermissionMatrix } from "../PermissionMatrix/PermissionMatrix";
import { Pagination } from "@/components/shared/Pagination";
import { useRoles } from "@/hooks/Roles";

export default function ListRolesAndPermission() {
  const [data, setData] = useState<Permission[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const LIMIT = 14;

  const totalPages = Math.ceil(total / LIMIT);

  const { roles, loading: loadingRoles } = useRoles();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const permRes = await apiClient.get<PaginatedData<Permission>>(
          `/permissions/matrix?page=${page}&limit=${LIMIT}`,
        );

        setData(permRes.data.data);
        setTotal(permRes.data.total);
      } catch {
        console.error("Error al cargar");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [page]);

  const filtered = data.filter(
    (p) =>
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading || loadingRoles) return <TableSkeleton />;

  return (
    <div className="container mx-auto py-10 space-y-4">
      <Input
        placeholder="Filtrar permiso..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      <PermissionMatrix
        permissions={filtered}
        roles={roles}
        onPermissionsChange={setData}
      />

      {/* Paginación */}
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}

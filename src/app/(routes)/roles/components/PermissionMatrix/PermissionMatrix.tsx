"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { apiClient } from "@/lib/api/api_client";
import { useState } from "react";
import {
  Permission,
  Role,
} from "@/features/roleAndPermission/roleAndPermission.type";
import {
  ROLE_LABELS,
  RoleSystem,
} from "@/features/roleAndPermission/role.constants";

interface Props {
  permissions: Permission[];
  roles: Role[];
  onPermissionsChange: (permissions: Permission[]) => void;
}

export function PermissionMatrix({
  permissions,
  roles,
  onPermissionsChange,
}: Props) {
  const [toggling, setToggling] = useState<string | null>(null);

  const hasRole = (p: Permission, roleId: string) =>
    p.roles.some((r) => r.id === roleId);

  const toggle = async (p: Permission, role: Role, checked: boolean) => {
    const key = `${p.id}-${role.id}`;
    setToggling(key);
    try {
      if (checked) {
        await apiClient.patch(`/role/${role.id}/permissions/${p.id}/add`);
      } else {
        await apiClient.patch(`/role/${role.id}/permissions/${p.id}/remove`);
      }

      const updated = permissions.map((perm) => {
        if (perm.id !== p.id) return perm;
        return {
          ...perm,
          roles: checked
            ? [...perm.roles, role]
            : perm.roles.filter((r) => r.id !== role.id),
        };
      });

      onPermissionsChange(updated);
      toast.success(
        checked
          ? `Asignado a ${ROLE_LABELS[role.name as RoleSystem]}`
          : `Removido de ${ROLE_LABELS[role.name as RoleSystem]}`,
      );
    } catch {
      toast.error("Error al actualizar permiso");
    } finally {
      setToggling(null);
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Permiso</TableHead>
            <TableHead>Descripción</TableHead>
            {roles.map((r) => (
              <TableHead key={r.id} className="text-center">
                {ROLE_LABELS[r.name as RoleSystem]}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {permissions.map((p) => (
            <TableRow key={p.id}>
              <TableCell className="font-mono text-xs text-muted-foreground">
                {p.name}
              </TableCell>
              <TableCell>{p.description}</TableCell>
              {roles.map((r) => (
                <TableCell key={r.id} className="text-center">
                  <Checkbox
                    checked={hasRole(p, r.id)}
                    disabled={toggling === `${p.id}-${r.id}`}
                    onCheckedChange={(checked) => toggle(p, r, !!checked)}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

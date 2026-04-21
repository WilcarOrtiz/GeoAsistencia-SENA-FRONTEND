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
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
  page: number;
}

export function PermissionMatrix({ permissions, roles, page }: Props) {
  const queryClient = useQueryClient();
  const LIMIT = 14;

  const { mutate: togglePermission, variables } = useMutation({
    mutationFn: ({
      permission,
      role,
      checked,
    }: {
      permission: Permission;
      role: Role;
      checked: boolean;
    }) =>
      checked
        ? apiClient.patch(`/role/${role.id}/permissions/${permission.id}/add`)
        : apiClient.patch(
            `/role/${role.id}/permissions/${permission.id}/remove`,
          ),

    onMutate: async ({ permission, role, checked }) => {
      await queryClient.cancelQueries({
        queryKey: ["permissions-matrix", page],
      });

      const previous = queryClient.getQueryData(["permissions-matrix", page]);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueryData(["permissions-matrix", page], (old: any) => ({
        ...old,
        data: old.data.map((p: Permission) => {
          if (p.id !== permission.id) return p;
          return {
            ...p,
            roles: checked
              ? [...p.roles, role]
              : p.roles.filter((r) => r.id !== role.id),
          };
        }),
      }));

      return { previous };
    },

    onError: (_, __, context) => {
      queryClient.setQueryData(["permissions-matrix", page], context?.previous);
      toast.error("Error al actualizar permiso");
    },

    onSuccess: (_, { role, checked }) => {
      toast.success(
        checked
          ? `Asignado a ${ROLE_LABELS[role.name as RoleSystem]}`
          : `Removido de ${ROLE_LABELS[role.name as RoleSystem]}`,
      );
    },
  });

  const hasRole = (p: Permission, roleId: string) =>
    p.roles.some((r) => r.id === roleId);

  const isToggling = (permId: string, roleId: string) =>
    variables?.permission.id === permId && variables?.role.id === roleId;

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
                    disabled={isToggling(p.id, r.id)}
                    onCheckedChange={(checked) =>
                      togglePermission({
                        permission: p,
                        role: r,
                        checked: !!checked,
                      })
                    }
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

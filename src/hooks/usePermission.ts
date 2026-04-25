"use client";
import { useAuth } from "@/context/authContext";

export function usePermissions() {
  const { user, permissions } = useAuth();

  const can = (permission: string): boolean => permissions.includes(permission);

  const hasRole = (role: string): boolean =>
    user?.roles.includes(role) ?? false;

  const canAny = (perms: string[]): boolean =>
    perms.some((p) => permissions.includes(p));

  const canAll = (perms: string[]): boolean =>
    perms.every((p) => permissions.includes(p));

  return { can, hasRole, canAny, canAll };
}

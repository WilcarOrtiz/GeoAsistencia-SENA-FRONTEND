"use client";

import { usePermissions } from "@/hooks/usePermission";

interface CanProps {
  permission?: string;
  role?: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function Can({ permission, role, children, fallback = null }: CanProps) {
  const { can, hasRole } = usePermissions();

  const allowed =
    (permission ? can(permission) : true) && (role ? hasRole(role) : true);

  return allowed ? <>{children}</> : <>{fallback}</>;
}

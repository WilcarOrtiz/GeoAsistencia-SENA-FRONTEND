export const ROLE_SYSTEM = {
  SUPER_ADMIN: { label: "Super administrador" },
  ADMIN: { label: "Administrador" },
  TEACHER: { label: "Docente" },
  STUDENT: { label: "Estudiante" },
} as const;

export type RoleSystem = keyof typeof ROLE_SYSTEM;

export const ROLE_SYSTEM_KEYS = Object.keys(ROLE_SYSTEM) as RoleSystem[];

export const ROLE_LABELS: Record<RoleSystem, string> = Object.fromEntries(
  Object.entries(ROLE_SYSTEM).map(([key, value]) => [key, value.label]),
) as Record<RoleSystem, string>;

export const ROLE_BADGE_VARIANT: Record<
  RoleSystem,
  "default" | "secondary" | "destructive" | "outline" | "ghost"
> = {
  SUPER_ADMIN: "destructive",
  ADMIN: "default",
  TEACHER: "secondary",
  STUDENT: "outline",
};

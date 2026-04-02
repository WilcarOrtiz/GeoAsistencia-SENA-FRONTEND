import { SemesterState } from "@/types/semester.type";

export const SEMESTER_STATE = {
  planned: { label: "Planeado" },
  active: { label: "Activo" },
  finished: { label: "Finalizado" },
  canceled: { label: "Cancelado" },
} as const;

export const SEMESTER_STATES = Object.keys(SEMESTER_STATE) as Array<
  keyof typeof SEMESTER_STATE
>;

export const STATE_BADGE_VARIANT: Record<
  SemesterState,
  "default" | "secondary" | "destructive" | "outline" | "ghost"
> = {
  planned: "secondary", // azul/neutral → Planeado
  active: "default", // gris → Activo
  finished: "outline", // borde → Finalizado
  canceled: "destructive", // rojo → Cancelado
};
export const STATE_LABELS: Record<keyof typeof SEMESTER_STATE, string> =
  Object.fromEntries(
    Object.entries(SEMESTER_STATE).map(([key, value]) => [key, value.label]),
  ) as Record<keyof typeof SEMESTER_STATE, string>;

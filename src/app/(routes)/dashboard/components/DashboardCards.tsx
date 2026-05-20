// features/dashboard/components/DashboardCards.tsx

import { Activity, Users, BookOpen, AlertTriangle } from "lucide-react";

import { Card } from "@/components/ui/card";

import { DashboardOverview } from "@/features/dashboard/dashboard.types";

import { MetricCard } from "@/components/shared/MetricCard";

interface Props {
  overview?: DashboardOverview;
  isLoading: boolean;
}

export function DashboardCards({ overview, isLoading }: Props) {
  if (isLoading)
    return (
      <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="animate-pulse h-32" />
        ))}
      </div>
    );

  const cards = [
    {
      title: "Total sesiones",
      value: overview?.total_sesiones ?? 0,
      icon: BookOpen,
      badge: "Sesiones",
      description: "Total sesiones",
      footerTitle: "Clases realizadas",
      footerSubtitle: "Semestre actual",
    },

    {
      title: "Tasa de asistencia",
      value: `${overview?.tasa_asistencia ?? 0}%`,
      icon: Activity,

      badge: (overview?.tasa_asistencia ?? 0) >= 80 ? "Buena" : "Crítica",

      description: "Tasa de asistencia",

      footerTitle:
        (overview?.tasa_asistencia ?? 0) >= 80
          ? "Por encima del umbral"
          : "Por debajo del umbral",

      footerSubtitle: "Promedio global",
    },

    {
      title: "Estudiantes activos",
      value: overview?.total_estudiantes ?? 0,
      icon: Users,
      badge: "Activos",
      description: "Estudiantes activos",
      footerTitle: "Matriculados actualmente",
      footerSubtitle: "En sus grupos",
    },

    {
      title: "Grupo crítico",

      value:
        overview?.grupo_critico_tasa != null
          ? `${overview.grupo_critico_tasa}%`
          : "N/A",

      icon: AlertTriangle,
      badge: "Menor asistencia",
      description: "Grupo crítico",

      footerTitle: overview?.grupo_critico_nombre ?? "Sin datos",

      footerSubtitle: "Requiere atención",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      {cards.map((card) => (
        <MetricCard key={card.title} {...card} className="@container/card" />
      ))}
    </div>
  );
}

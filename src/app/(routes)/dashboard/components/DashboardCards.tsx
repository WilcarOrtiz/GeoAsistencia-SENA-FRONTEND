// features/dashboard/components/DashboardCards.tsx
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Users, BookOpen, AlertTriangle } from "lucide-react";
import { DashboardOverview } from "@/features/dashboard/dashboard.types";

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

  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      {/* Total sesiones */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total sesiones</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {overview?.total_sesiones ?? 0}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <BookOpen className="size-3 mr-1" />
              Sesiones
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Clases realizadas
          </div>
          <div className="text-muted-foreground">Semestre actual</div>
        </CardFooter>
      </Card>

      {/* Tasa asistencia */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Tasa de asistencia</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {overview?.tasa_asistencia ?? 0}%
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <Activity className="size-3 mr-1" />
              {(overview?.tasa_asistencia ?? 0) >= 80 ? "Buena" : "Crítica"}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {(overview?.tasa_asistencia ?? 0) >= 80
              ? "Por encima del umbral"
              : "Por debajo del umbral"}
          </div>
          <div className="text-muted-foreground">Promedio global</div>
        </CardFooter>
      </Card>

      {/* Total estudiantes */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Estudiantes activos</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {overview?.total_estudiantes ?? 0}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <Users className="size-3 mr-1" />
              Activos
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Matriculados actualmente
          </div>
          <div className="text-muted-foreground">En sus grupos</div>
        </CardFooter>
      </Card>

      {/* Grupo crítico */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Grupo crítico</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {overview?.grupo_critico_tasa != null
              ? `${overview.grupo_critico_tasa}%`
              : "N/A"}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <AlertTriangle className="size-3 mr-1" />
              Menor asistencia
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {overview?.grupo_critico_nombre ?? "Sin datos"}
          </div>
          <div className="text-muted-foreground">Requiere atención</div>
        </CardFooter>
      </Card>
    </div>
  );
}

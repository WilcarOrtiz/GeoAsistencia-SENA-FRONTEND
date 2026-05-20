"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { SubjectRanking } from "@/features/dashboard/dashboard.types";

interface Props {
  data: SubjectRanking[];
  isLoading: boolean;
}

export function SubjectsRankingTable({ data, isLoading }: Props) {
  return (
    <Card className="card-modern">
      <CardHeader>
        <CardTitle>Ranking de asignaturas</CardTitle>

        <CardDescription>Ordenadas por asistencia</CardDescription>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-12 animate-pulse rounded-lg bg-muted" />
            ))}
          </div>
        ) : data.length === 0 ? (
          <p className="text-sm text-muted-foreground">Sin datos disponibles</p>
        ) : (
          <div className="space-y-4">
            {data.map((s, i) => (
              <div key={s.subject_id} className="space-y-2">
                {/* HEADER */}
                <div className="flex items-center gap-3">
                  <span className="w-5 text-xs font-medium text-muted-foreground">
                    #{i + 1}
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {s.subject_name}
                    </p>
                  </div>

                  <Badge
                    variant="secondary"
                    className="
                      border-0
                      bg-[color:var(--chart-2)]
                      text-white
                    "
                  >
                    {s.porcentaje_asistencia}%
                  </Badge>
                </div>

                {/* BAR */}
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="
                      h-full
                      rounded-full
                      transition-all
                      duration-500
                    "
                    style={{
                      width: `${s.porcentaje_asistencia}%`,
                      background:
                        "linear-gradient(to right, var(--chart-1), var(--chart-2))",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

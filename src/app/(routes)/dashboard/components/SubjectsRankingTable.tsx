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

        <CardDescription>
          Asignaturas con mayor asistencia estudiantil
        </CardDescription>
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
                </div>

                {/* BAR */}
                <div className="flex items-center gap-2">
                  {/* BAR */}
                  <div className="flex-1 h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full transition-all duration-500 opacity-70"
                      style={{
                        width: `${s.porcentaje_asistencia}%`,
                        background:
                          "linear-gradient(to right, var(--chart-1), var(--chart-2))",
                      }}
                    />
                  </div>

                  {/* BADGE */}
                  <Badge
                    variant="secondary"
                    className="border-0 bg-background/80 text-foreground backdrop-blur"
                  >
                    {s.porcentaje_asistencia}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

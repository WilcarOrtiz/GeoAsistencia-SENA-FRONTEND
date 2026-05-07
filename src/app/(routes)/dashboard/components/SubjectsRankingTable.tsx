// features/dashboard/components/SubjectsRankingTable.tsx
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
    <Card>
      <CardHeader>
        <CardTitle>Ranking de asignaturas</CardTitle>
        <CardDescription>Ordenadas por % de asistencia</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-10 animate-pulse rounded bg-muted" />
            ))}
          </div>
        ) : data.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Sin datos disponibles.
          </p>
        ) : (
          <div className="space-y-2">
            {data.map((s, i) => (
              <div key={s.subject_id} className="flex items-center gap-3">
                <span className="w-5 text-right text-xs text-muted-foreground">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">
                      {s.subject_name}
                    </span>
                    <Badge variant="outline">{s.porcentaje_asistencia}%</Badge>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-green-500"
                      style={{ width: `${s.porcentaje_asistencia}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

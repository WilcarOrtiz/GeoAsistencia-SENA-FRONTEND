// features/dashboard/components/StudentsAbsencesTable.tsx
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StudentAbsence } from "@/features/dashboard/dashboard.types";

interface Props {
  data: StudentAbsence[];
  isLoading: boolean;
  isAdmin: boolean;
}

export function StudentsAbsencesTable({ data, isLoading, isAdmin }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Estudiantes con más ausencias</CardTitle>
        <CardDescription>
          Top 10 — ordenados por total de faltas
        </CardDescription>
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
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-muted-foreground">
                  <th className="py-2 text-left font-medium">Estudiante</th>
                  <th className="py-2 text-left font-medium">Grupo</th>
                  {isAdmin && (
                    <th className="py-2 text-left font-medium">Asignatura</th>
                  )}
                  <th className="py-2 text-right font-medium">Clases</th>
                  <th className="py-2 text-right font-medium">Ausencias</th>
                  <th className="py-2 text-right font-medium">%</th>
                </tr>
              </thead>
              <tbody>
                {data.map((s) => (
                  <tr
                    key={s.student_id}
                    className="border-b last:border-0 hover:bg-muted/40"
                  >
                    <td className="py-2">{s.student_name}</td>
                    <td className="py-2 text-muted-foreground">
                      {s.group_name}
                    </td>
                    {isAdmin && (
                      <td className="py-2 text-muted-foreground">
                        {s.subject_name}
                      </td>
                    )}
                    <td className="py-2 text-right">{s.total_clases}</td>
                    <td className="py-2 text-right">{s.total_ausencias}</td>
                    <td className="py-2 text-right">
                      <Badge
                        variant={
                          s.porcentaje_ausencia >= 30
                            ? "destructive"
                            : "outline"
                        }
                      >
                        {s.porcentaje_ausencia}%
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

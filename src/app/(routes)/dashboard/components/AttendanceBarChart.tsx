"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import type { GroupAttendance } from "@/features/dashboard/dashboard.types";

interface Props {
  data: GroupAttendance[];
  isLoading: boolean;
}

// Tooltip personalizado con toda la info del grupo
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;

  const d = payload[0]?.payload as GroupAttendance;

  return (
    <div className="rounded-lg border bg-background p-3 shadow-md text-sm space-y-1 min-w-48">
      <p className="font-semibold text-foreground">{d.group_name}</p>
      <p className="text-muted-foreground text-xs">{d.subject_name}</p>
      {d.teacher_name && (
        <p className="text-muted-foreground text-xs">
          Docente: {d.teacher_name}
        </p>
      )}
      {d.semester_name && (
        <p className="text-muted-foreground text-xs">
          Semestre: {d.semester_name}
        </p>
      )}
      <div className="border-t pt-1 mt-1 space-y-1">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <span className="inline-block size-2.5 rounded-sm bg-green-500" />
            <span>Asistencia</span>
          </div>
          <span className="font-medium">{d.porcentaje_asistencia}%</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <span className="inline-block size-2.5 rounded-sm bg-red-400" />
            <span>Inasistencia</span>
          </div>
          <span className="font-medium">{d.porcentaje_inasistencia}%</span>
        </div>
      </div>
    </div>
  );
}

export function AttendanceBarChart({ data, isLoading }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Asistencia por grupo</CardTitle>
        <CardDescription>
          Porcentaje de asistencia e inasistencia por grupo
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-64 animate-pulse rounded-lg bg-muted" />
        ) : data.length === 0 ? (
          <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
            Sin datos disponibles
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={320}>
            <BarChart
              data={data}
              margin={{ top: 0, right: 0, left: -20, bottom: 70 }}
              barCategoryGap="30%" // espacio entre grupos
              barGap={4} // espacio entre las dos barras
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="group_name"
                tickLine={false}
                axisLine={false}
                angle={-35}
                textAnchor="end"
                tick={{ fontSize: 11 }}
                interval={0}
              />
              <YAxis
                domain={[0, 100]}
                unit="%"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11 }}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "hsl(var(--muted))", opacity: 0.5 }}
              />
              <Legend verticalAlign="top" height={36} />

              <Bar
                dataKey="porcentaje_asistencia"
                name="Asistencia"
                fill="var(--chart-1)"
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
              />

              <Bar
                dataKey="porcentaje_inasistencia"
                name="Inasistencia"
                fill="var(--chart-5)"
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}

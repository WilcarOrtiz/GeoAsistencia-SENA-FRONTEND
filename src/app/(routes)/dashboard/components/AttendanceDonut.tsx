"use client";

import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { AttendanceDistribution } from "@/features/dashboard/dashboard.types";

const COLORS: Record<string, string> = {
  PRESENT: "var(--chart-2)",
  ABSENT: "var(--chart-5)",
  LATE: "var(--chart-3)",
};

const LABELS: Record<string, string> = {
  PRESENT: "Presente",
  ABSENT: "Ausente",
  LATE: "Tarde",
};

interface Props {
  data: AttendanceDistribution[];
  isLoading: boolean;
}

export function AttendanceDonut({ data, isLoading }: Props) {
  const formatted = data.map((d) => ({
    key: d.status,
    name: LABELS[d.status] ?? d.status,
    value: d.porcentaje,
    total: d.total,
    color: COLORS[d.status],
  }));

  const totalStudents = data.reduce((acc, item) => acc + item.total, 0);

  return (
    <Card className="card-modern">
      <CardHeader className="space-y-1">
        <CardTitle>Distribución de asistencia</CardTitle>

        <CardDescription>
          Estado general de asistencia estudiantil
        </CardDescription>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="h-64 animate-pulse rounded-xl bg-muted" />
        ) : (
          <div className="flex flex-col items-center gap-6">
            {/* CHART */}
            <div className="relative h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={formatted}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={95}
                    paddingAngle={4}
                    stroke="transparent"
                  >
                    {formatted.map((entry) => (
                      <Cell key={entry.key} fill={entry.color} />
                    ))}
                  </Pie>

                  <Tooltip
                    cursor={false}
                    contentStyle={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "16px",
                      boxShadow: "var(--shadow-card)",
                      color: "var(--foreground)",
                    }}
                    formatter={(value, name, props) => [
                      `${value}% (${props.payload.total})`,
                      name,
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* CENTER CONTENT */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-foreground">
                  {totalStudents}
                </span>

                <span className="text-sm text-muted-foreground">Registros</span>
              </div>
            </div>

            {/* CUSTOM LEGEND */}
            <div className="grid w-full grid-cols-3 gap-3">
              {formatted.map((item) => (
                <div
                  key={item.key}
                  className="rounded-xl border bg-background/50 p-3"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="size-2.5 rounded-full"
                      style={{
                        background: item.color,
                      }}
                    />

                    <span className="text-sm font-medium">{item.name}</span>
                  </div>

                  <div className="mt-2">
                    <p className="text-2xl font-bold">{item.value}%</p>

                    <p className="text-xs text-muted-foreground">
                      {item.total} registros
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

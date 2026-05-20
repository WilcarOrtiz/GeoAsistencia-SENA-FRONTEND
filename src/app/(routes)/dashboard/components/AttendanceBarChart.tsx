"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
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

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;

  const d = payload[0]?.payload as GroupAttendance;

  return (
    <div
      className="
        min-w-52
        rounded-2xl
        border
        bg-background/95
        p-4
        shadow-xl
        backdrop-blur
      "
    >
      <div className="space-y-1">
        <p className="font-semibold text-foreground">{d.group_name}</p>

        <p className="text-xs text-muted-foreground">{d.subject_name}</p>

        {d.teacher_name && (
          <p className="text-xs text-muted-foreground">
            Docente: {d.teacher_name}
          </p>
        )}
      </div>

      <div className="mt-4 space-y-2 border-t pt-3">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span
              className="size-2.5 rounded-full"
              style={{
                background: "var(--chart-1)",
              }}
            />

            <span className="text-sm">Asistencia</span>
          </div>

          <span className="font-semibold">{d.porcentaje_asistencia}%</span>
        </div>

        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span
              className="size-2.5 rounded-full"
              style={{
                background: "var(--chart-5)",
              }}
            />

            <span className="text-sm">Inasistencia</span>
          </div>

          <span className="font-semibold">{d.porcentaje_inasistencia}%</span>
        </div>
      </div>
    </div>
  );
}

export function AttendanceBarChart({ data, isLoading }: Props) {
  return (
    <Card className="card-modern border-0">
      <CardHeader className="pb-2">
        <CardTitle>Asistencia por grupo</CardTitle>

        <CardDescription>
          Tendencia de asistencia e inasistencia
        </CardDescription>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="h-[320px] animate-pulse rounded-2xl bg-muted" />
        ) : data.length === 0 ? (
          <div className="flex h-[320px] items-center justify-center text-sm text-muted-foreground">
            Sin datos disponibles
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: -20,
                bottom: 40,
              }}
            >
              <defs>
                <linearGradient
                  id="attendanceGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="var(--chart-1)"
                    stopOpacity={0.35}
                  />

                  <stop
                    offset="95%"
                    stopColor="var(--chart-1)"
                    stopOpacity={0}
                  />
                </linearGradient>

                <linearGradient
                  id="absenceGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="var(--chart-5)"
                    stopOpacity={0.25}
                  />

                  <stop
                    offset="95%"
                    stopColor="var(--chart-5)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                opacity={0.2}
              />

              <XAxis
                dataKey="group_name"
                tickLine={false}
                axisLine={false}
                tick={{
                  fontSize: 11,
                  fill: "var(--muted-foreground)",
                }}
                angle={-20}
                textAnchor="end"
                interval={0}
                height={60}
              />

              <YAxis
                domain={[0, 100]}
                tickLine={false}
                axisLine={false}
                tick={{
                  fontSize: 11,
                  fill: "var(--muted-foreground)",
                }}
                unit="%"
              />

              <Tooltip cursor={false} content={<CustomTooltip />} />

              {/* ASISTENCIA */}
              <Area
                type="monotone"
                dataKey="porcentaje_asistencia"
                name="Asistencia"
                stroke="var(--chart-1)"
                fill="url(#attendanceGradient)"
                strokeWidth={3}
                dot={{
                  r: 4,
                  fill: "var(--chart-1)",
                  strokeWidth: 0,
                }}
                activeDot={{
                  r: 6,
                }}
              />

              {/* INASISTENCIA */}
              <Area
                type="monotone"
                dataKey="porcentaje_inasistencia"
                name="Inasistencia"
                stroke="var(--chart-5)"
                fill="url(#absenceGradient)"
                strokeWidth={3}
                dot={{
                  r: 4,
                  fill: "var(--chart-5)",
                  strokeWidth: 0,
                }}
                activeDot={{
                  r: 6,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}

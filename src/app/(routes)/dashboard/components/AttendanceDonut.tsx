"use client";

import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";

import { CardContent } from "@/components/ui/card";

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
    <CardContent>
      {isLoading ? (
        <div className="h-[320px] animate-pulse rounded-2xl bg-muted" />
      ) : (
        <div className="grid h-[320px] grid-cols-[1.2fr_0.8fr] gap-4">
          {/* LEFT */}
          <div className="flex h-full flex-col rounded-2xl border p-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Distribución de asistencia
              </h3>

              <p className="text-xs text-muted-foreground">
                Estado general estudiantil
              </p>
            </div>

            <div className="relative flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  {/* GRADIENTS */}
                  <defs>
                    <linearGradient
                      id="gradientPresent"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="var(--chart-2)"
                        stopOpacity={1}
                      />
                      <stop
                        offset="100%"
                        stopColor="var(--chart-2)"
                        stopOpacity={0.25}
                      />
                    </linearGradient>

                    <linearGradient
                      id="gradientAbsent"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="var(--chart-5)"
                        stopOpacity={1}
                      />
                      <stop
                        offset="100%"
                        stopColor="var(--chart-5)"
                        stopOpacity={0.25}
                      />
                    </linearGradient>

                    <linearGradient
                      id="gradientLate"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="var(--chart-3)"
                        stopOpacity={1}
                      />
                      <stop
                        offset="100%"
                        stopColor="var(--chart-3)"
                        stopOpacity={0.25}
                      />
                    </linearGradient>
                  </defs>

                  <Pie
                    data={formatted}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={88}
                    paddingAngle={4}
                    stroke="transparent"
                  >
                    {formatted.map((entry) => {
                      const gradientMap: Record<string, string> = {
                        PRESENT: "url(#gradientPresent)",
                        ABSENT: "url(#gradientAbsent)",
                        LATE: "url(#gradientLate)",
                      };

                      return (
                        <Cell key={entry.key} fill={gradientMap[entry.key]} />
                      );
                    })}
                  </Pie>

                  <Tooltip
                    cursor={false}
                    contentStyle={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "16px",
                      color: "var(--foreground)",
                    }}
                    formatter={(value, name, props) => [
                      `${value}% (${props.payload.total})`,
                      name,
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* CENTER */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-foreground">
                  {totalStudents}
                </span>

                <span className="text-xs text-muted-foreground">Registros</span>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="grid h-full grid-rows-3 gap-3">
            {formatted.map((item) => (
              <div
                key={item.key}
                className="
                  flex
                  flex-col
                  justify-between
                  rounded-2xl
                  border
                  p-4
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                "
              >
                <div className="flex items-center gap-2">
                  <span
                    className="size-3 rounded-full"
                    style={{
                      background: item.color,
                    }}
                  />

                  <span className="text-sm font-medium text-foreground">
                    {item.name}
                  </span>
                </div>

                <div>
                  <p className="text-xl font-bold text-foreground">
                    {item.value}%
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.total} registros
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </CardContent>
  );
}

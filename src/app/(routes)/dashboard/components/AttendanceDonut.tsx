// features/dashboard/components/AttendanceDonut.tsx
"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { AttendanceDistribution } from "@/features/dashboard/dashboard.types";

const COLORS: Record<string, string> = {
  PRESENT: "#22c55e",
  ABSENT: "#f87171",
  LATE: "#facc15",
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
    name: LABELS[d.status] ?? d.status,
    value: d.porcentaje,
    total: d.total,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribución de asistencia</CardTitle>
        <CardDescription>PRESENT / ABSENT / LATE</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-64 animate-pulse rounded-lg bg-muted" />
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={formatted}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
              >
                {data.map((entry) => (
                  <Cell key={entry.status} fill={COLORS[entry.status]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name, props) => [
                  `${value}% (${props.payload.total})`,
                  name,
                ]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}

"use client";

import useSWR from "swr";
import { useParams, useRouter } from "next/navigation";

import { apiClient } from "@/lib/api/api_client";
import { ClassGroup } from "@/features/classGroup/ClassGroup.type";

import { PageHeader } from "@/components/shared/PageHeader";
import { FormSkeleton } from "@/components/shared/FormSkeleton";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  CalendarDays,
  Layers,
  TrendingUp,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useClassSchedules } from "../../hook/useClassDays";
import { WeekDay, WeekDayLabel } from "@/types/weekDay";

const fetcher = async (url: string) => {
  const { data } = await apiClient.get<ClassGroup>(url);
  return data;
};

export default function UpdateAcademicGroupPage() {
  const router = useRouter();
  const { id } = useParams();

  const { data: classGroup, isLoading } = useSWR(
    `/class-groups/${id}`,
    fetcher,
  );
  const { schedules } = useClassSchedules(id as string);

  if (isLoading) return <FormSkeleton fields={6} />;

  const capacity = classGroup!.total_students;
  const maxCapacity = classGroup!.max_students;
  const attendanceRate = 98.2;
  console.log("horarios: ", schedules);
  return (
    <div className="container mx-auto py-6 space-y-8">
      {/* HEADER */}
      <Button
        variant="ghost"
        size="sm"
        className="mb-2 -ml-2"
        onClick={() => router.push("/academic-groups")}
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Volver
      </Button>
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <PageHeader title={classGroup?.name ?? "Group"} />
            <Badge variant={classGroup?.is_active ? "success" : "inactive"}>
              {classGroup?.is_active ? "Active" : "Inactive"}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground">
            Asignatura{" "}
            <span className="font-semibold text-foreground">
              {classGroup?.subject.name}({classGroup?.code})
            </span>{" "}
            <span className="mx-2 text-muted-foreground">|</span> Docente{" "}
            <span className="font-semibold text-foreground">
              Prof. {classGroup?.teacher.name}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3 py-2 text-sm rounded-md border hover:bg-muted transition">
            Modificar horarios
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            label: "Total de estudiantes",
            value: capacity,
            icon: Users,
          },
          {
            label: "Tasa de asistencia",
            value: `${attendanceRate}%`,
            icon: TrendingUp,
          },
          {
            label: "Capacidad actual",
            value: `${capacity}/${maxCapacity}`,
            extra: `(${Math.round((capacity / maxCapacity) * 100)}%)`,
            icon: Layers,
          },
        ].map((item, i) => {
          const Icon = item.icon;

          return (
            <Card key={i} className="hover:shadow-sm transition">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs text-muted-foreground uppercase tracking-wide flex items-center gap-2 justify-between">
                  {item.label}
                  <Icon className="w-4 h-4 text-muted-foreground" />
                </CardTitle>
              </CardHeader>

              <CardContent className="flex items-end gap-2">
                <span className="text-2xl font-semibold">{item.value}</span>

                {item.extra && (
                  <span className="text-sm text-muted-foreground">
                    {item.extra}
                  </span>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* LOWER SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Teacher (NOW STAT CARD STYLE) */}
        <Card className="hover:shadow-sm transition">
          <CardContent className="flex items-center justify-between">
            {/* LEFT SIDE */}
            <div className="space-y-1">
              <p className="text-base font-semibold">Total de encuentros</p>

              <p className="text-sm text-muted-foreground">
                Sesiones realizadas por este grupo académico
              </p>
            </div>

            {/* RIGHT SIDE (BIG NUMBER FULL HEIGHT) */}
            <span className="text-6xl font-bold tracking-tight leading-none">
              {classGroup?.total_sessions ?? 0}
            </span>
          </CardContent>
        </Card>

        {/* Schedule (NO CARD LOOK, SOFT BLOCK) */}
        <div className="md:col-span-2 rounded-lg border bg-muted/30 p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs uppercase tracking-wide flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              Horario de clase
            </p>
          </div>

          <div className="space-y-2 text-sm">
            {schedules
              .filter((s) => s.is_active)
              .map((s) => (
                <div
                  key={s.id}
                  className="flex justify-between py-1 border-b last:border-none"
                >
                  {/* DÍA */}
                  <span className="font-medium">
                    {WeekDayLabel[s.day as WeekDay]}
                  </span>

                  {/* HORA */}
                  <span className="text-muted-foreground">
                    {s.start_time.slice(0, 5)} - {s.end_time.slice(0, 5)}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
//REVISAR QUE CUANDO ELIMINO UN HORARIO Y GUARDO ME SALE UN AVISO

"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

import { apiClient } from "@/lib/api/api_client";
import { ClassGroup } from "@/features/classGroup/ClassGroup.type";

import { PageHeader } from "@/components/shared/PageHeader";
import { FormSkeleton } from "@/components/shared/FormSkeleton";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
import { DownloadTemplateLink } from "@/components/shared/TemplateDownload";
import { BulkImportButton } from "@/components/shared/Bulkimportbutton";
import ListEnrollment from "./components/ListEnrrollments/List";
import { useEnrollments } from "../../hook/useEnrollment";
import { MetricCard } from "@/components/shared/MetricCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AttendanceHistoryTable } from "./components/AttendanceHistoryTable/AttendanceHistoryTable";
import { useClassSessions } from "../../hook/useClassSesions";

export default function DetailscademicGroupPage() {
  const router = useRouter();
  const { id } = useParams();

  const groupId =
    typeof id === "string" ? id : Array.isArray(id) ? id[0] : undefined;

  const {
    students,
    isLoading: isLoadingStudents,
    ...rest
  } = useEnrollments(groupId ?? "");

  const { data: classGroup, isLoading } = useQuery<ClassGroup>({
    queryKey: ["class-group", groupId],
    queryFn: async () => {
      const { data } = await apiClient.get<ClassGroup>(
        `/class-groups/${groupId}`,
      );
      return data;
    },
    enabled: !!groupId,
  });

  const { schedules } = useClassSchedules(groupId ?? "");
  const { sessions } = useClassSessions(groupId ?? "");

  if (!groupId) {
    return <p className="p-6">Grupo inválido</p>;
  }

  if (isLoading || !classGroup) {
    return <FormSkeleton fields={6} />;
  }

  const capacity = classGroup.total_students;
  const maxCapacity = classGroup.max_students;

  const attendanceRate =
    students.length > 0
      ? (
          students.reduce((acc, s) => acc + (s.attendance_percentage ?? 0), 0) /
          students.length
        ).toFixed(1)
      : "0";

  return (
    <div className="pl-10 pr-10 pt-5 space-y-8">
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
            <PageHeader title={classGroup.name} />
            <Badge variant={classGroup.is_active ? "success" : "inactive"}>
              {classGroup.is_active ? "Activo" : "Inactivo"}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground">
            Asignatura{" "}
            <span className="font-semibold text-foreground">
              {classGroup.subject.name} ({classGroup.code})
            </span>{" "}
            <span className="mx-2">|</span> Docente{" "}
            <span className="font-semibold text-foreground">
              Prof. {classGroup.teacher.name}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-10">
          <DownloadTemplateLink
            endpoint="/enrollment/bulk/template"
            label="Estudiantes"
          />

          <BulkImportButton
            endpoint={`/enrollment/bulk/import/${groupId}`}
            queryKey={["enrollment", groupId]}
            extraQueryKeys={[["class-group", groupId]]}
            label="Matricular estudiante(s)"
          />
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            title: "Total de estudiantes",
            value: capacity,
            icon: Users,
          },

          {
            title: "Tasa de asistencia",
            value: `${attendanceRate}%`,
            icon: TrendingUp,
          },

          {
            title: "Capacidad actual",
            value: `${capacity}/${maxCapacity}`,
            extra: `(${Math.round((capacity / maxCapacity) * 100)}%)`,
            icon: Layers,
          },
        ].map((item) => (
          <MetricCard
            key={item.title}
            title={item.title}
            value={item.value}
            icon={item.icon}
            extra={item.extra}
          />
        ))}
      </div>
      {/*Lista de asistencia y lista de clase*/}

      <Tabs defaultValue="enrollments" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="enrollments">Lista de estudiantes</TabsTrigger>
          <TabsTrigger value="attendance">Historial de asistencias</TabsTrigger>
        </TabsList>

        <TabsContent value="enrollments">
          <ListEnrollment
            id={groupId}
            students={students}
            isLoading={isLoadingStudents}
            {...rest}
          />
        </TabsContent>

        <TabsContent value="attendance">
          <AttendanceHistoryTable sessions={sessions} />
        </TabsContent>
      </Tabs>

      {/* LOWER */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Total de encuentros</p>
              <p className="text-sm text-muted-foreground">
                Sesiones realizadas
              </p>
            </div>
            <button
              onClick={() => {
                router.push(`/academic-groups/${id}/details/attendances`);
              }}
            >
              {" "}
              <span className="text-5xl font-bold">
                {classGroup.total_sessions ?? 0}
              </span>
            </button>{" "}
          </CardContent>
        </Card>

        <div className="md:col-span-2 border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3 text-xs uppercase">
            <CalendarDays className="w-4 h-4" />
            Horario de clase
          </div>

          <div className="space-y-2 text-sm">
            {schedules
              .filter((s) => s.is_active)
              .map((s) => (
                <div key={s.id} className="flex justify-between border-b py-1">
                  <span className="font-medium">
                    {WeekDayLabel[s.day as WeekDay]}
                  </span>
                  <span>
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

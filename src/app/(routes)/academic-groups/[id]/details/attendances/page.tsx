"use client";

import { useParams } from "next/navigation";
import { useClassSessions } from "../../../hook/useClassSesions";
import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";

export default function AttendacesHistory() {
  const { id } = useParams();
  const groupId =
    typeof id === "string" ? id : Array.isArray(id) ? id[0] : undefined;

  const { sessions } = useClassSessions(groupId ?? "");

  const totalSessions = sessions.length;
  const avgAttendance =
    sessions.length > 0
      ? Math.round(
          sessions.reduce(
            (acc, s) => acc + (s.total_present / s.total_students) * 100,
            0,
          ) / sessions.length,
        )
      : 0;

  if (!groupId) return null;

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* HEADER */}
      <div className="flex items-start justify-between gap-4">
        <PageHeader
          title="Historial de sesiones"
          backHref={`/academic-groups/${groupId}/details`}
        />
        <div className="flex gap-3 shrink-0">
          <div className="bg-muted rounded-lg px-4 py-2 text-center">
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
              Sesiones
            </p>
            <p className="text-2xl font-semibold">{totalSessions}</p>
          </div>
          <div className="bg-muted rounded-lg px-4 py-2 text-center">
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
              Asistencia
            </p>
            <p className="text-2xl font-semibold">{avgAttendance}%</p>
          </div>
        </div>
      </div>

      {/* TABLA */}
      <div className="rounded-lg border overflow-hidden">
        {/* Header row */}
        <div className="grid grid-cols-[1fr_auto_auto] gap-3 px-4 py-2.5 bg-muted border-b text-[11px] uppercase tracking-wide text-muted-foreground font-medium">
          <span>Sesión</span>
          <span className="text-right min-w-[60px]">Asistencia</span>
          <span className="min-w-[80px] text-right">Estado</span>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {sessions.map((session) => {
            const pct = Math.round(
              (session.total_present / session.total_students) * 100,
            );
            const pctColor =
              pct >= 80
                ? "text-green-600"
                : pct >= 60
                  ? "text-amber-500"
                  : "text-red-500";
            const barColor =
              pct >= 80
                ? "bg-green-500"
                : pct >= 60
                  ? "bg-amber-400"
                  : "bg-red-500";

            return (
              <AccordionItem
                key={session.id}
                value={session.id}
                className="border-b last:border-0"
              >
                <AccordionTrigger className="hover:no-underline hover:bg-muted/50 px-4 py-3 [&>svg]:hidden">
                  <div className="grid grid-cols-[1fr_auto_auto] w-full gap-3 items-center">
                    {/* Izquierda */}
                    <div className="text-left min-w-0">
                      <p className="font-medium text-sm truncate">
                        {session.class_topic}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {new Date(session.date).toLocaleDateString("es-CO", {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                        })}{" "}
                        · {session.attendance_opened_at?.slice(0, 5)} –{" "}
                        {session.attendance_closed_at ? (
                          session.attendance_closed_at.slice(0, 5)
                        ) : (
                          <span className="text-green-600 font-medium">
                            En curso
                          </span>
                        )}
                      </p>
                    </div>

                    {/* % */}
                    <div className="text-right min-w-[60px]">
                      <p className={`text-base font-semibold ${pctColor}`}>
                        {pct}%
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {session.total_present}/{session.total_students}
                      </p>
                    </div>

                    {/* Badge */}
                    <Badge
                      variant={session.is_open ? "success" : "secondary"}
                      className="min-w-[80px] justify-center"
                    >
                      {!session.is_open ? "Abierta" : "Cerrada"}
                    </Badge>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="bg-muted/30 px-0 pb-0">
                  {/* Barra de asistencia */}
                  <div className="flex items-center gap-3 px-4 py-3 border-t">
                    <Progress
                      value={pct}
                      className={`h-1.5 flex-1 ${barColor}`}
                    />
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {pct}% asistencia
                    </span>
                  </div>
                  {/* Aquí irá la lista de estudiantes cuando la tengas */}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
}

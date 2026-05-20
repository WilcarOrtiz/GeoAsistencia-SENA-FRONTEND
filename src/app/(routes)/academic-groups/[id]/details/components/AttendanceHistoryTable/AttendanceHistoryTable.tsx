"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Progress } from "@/components/ui/progress";

import { ClassSession } from "@/app/(routes)/academic-groups/hook/useClassSesions";
import { SessionAttendanceList } from "./components/SessionAttendanceList";

interface Props {
  sessions: ClassSession[];
}

const ITEMS_PER_PAGE = 5;

export function AttendanceHistoryTable({ sessions }: Props) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(sessions.length / ITEMS_PER_PAGE);

  const paginatedSessions = sessions.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  return (
    <div className="rounded-lg border overflow-hidden">
      {/* HEADER */}
      <div className="grid grid-cols-[1fr_auto_auto] gap-3 px-4 py-2.5 bg-muted border-b text-[11px] uppercase tracking-wide text-muted-foreground font-medium">
        <span>Sesión</span>

        <span className="text-right min-w-[60px]">Asistencia</span>

        <span className="min-w-[80px] text-right">Estado</span>
      </div>

      {/* CONTENT */}
      <Accordion type="single" collapsible className="w-full">
        {paginatedSessions.map((session) => {
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
            <AccordionItem key={session.id} value={session.id}>
              <AccordionTrigger className="hover:no-underline hover:bg-muted/50 px-4 py-3 [&>svg]:hidden">
                <div className="grid grid-cols-[1fr_auto_auto] w-full gap-3 items-center">
                  {/* LEFT */}
                  <div className="text-left min-w-0">
                    <p className="font-medium text-sm truncate">
                      {session.class_topic}
                    </p>

                    <p className="text-xs text-muted-foreground mt-0.5">
                      {new Date(session.date).toLocaleDateString("es-CO", {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                      })}
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

                  {/* BADGE */}
                  <Badge
                    variant={session.is_open ? "success" : "secondary"}
                    className="min-w-[80px] justify-center"
                  >
                    {session.is_open ? "Abierta" : "Cerrada"}
                  </Badge>
                </div>
              </AccordionTrigger>

              <AccordionContent className="bg-muted/30 px-0 pb-0">
                <div className="flex items-center gap-3 px-4 py-3 border-t">
                  <Progress
                    value={pct}
                    className={`h-1.5 flex-1 ${barColor}`}
                  />

                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {pct}% asistencia
                  </span>
                </div>
                <SessionAttendanceList sessionId={session.id} />
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      {/* FOOTER */}
      <div className="flex items-center justify-between border-t px-4 py-3">
        <p className="text-sm text-muted-foreground">
          Página {page} de {totalPages}
        </p>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 1}
          >
            Anterior
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page === totalPages}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
}

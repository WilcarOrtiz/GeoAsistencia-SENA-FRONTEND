"use client";

import { useSessionAttendances } from "@/app/(routes)/academic-groups/hook/useAttendances";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, CircleDashed, Clock3, XCircle } from "lucide-react";

interface Props {
  sessionId: string;
}

export function SessionAttendanceList({ sessionId }: Props) {
  const { attendances, isLoading } = useSessionAttendances(sessionId);

  if (isLoading) {
    return (
      <div className="p-4 text-sm text-muted-foreground">
        Cargando estudiantes...
      </div>
    );
  }

  if (!attendances.length) {
    return (
      <div className="p-4 text-sm text-muted-foreground">
        No hay asistencias registradas.
      </div>
    );
  }

  return (
    <div className="grid gap-2 p-3 md:grid-cols-2 lg:grid-cols-3">
      {attendances.map((attendance) => {
        const isPresent = attendance.status === "PRESENT";

        const isLate = attendance.status === "LATE";

        const isAbsent = attendance.status === "ABSENT";

        return (
          <div
            key={attendance.id}
            className="
          rounded-lg border bg-background
          px-3 py-3
          flex items-center justify-between
          transition-colors
          hover:bg-muted/40
        "
          >
            {/* LEFT */}
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">
                {attendance.student.name}
              </p>

              <p className="text-xs text-muted-foreground">
                {attendance.check_in_time
                  ? `Ingreso ${attendance.check_in_time.slice(0, 5)}`
                  : "Sin registro"}
              </p>
            </div>

            {/* RIGHT */}
            <div className="shrink-0">
              {isPresent && <CheckCircle2 className="h-5 w-5 text-green-600" />}

              {isAbsent && <XCircle className="h-5 w-5 text-red-500" />}

              {isLate && <Clock3 className="h-5 w-5 text-amber-500" />}

              {!isPresent && !isAbsent && !isLate && (
                <CircleDashed className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

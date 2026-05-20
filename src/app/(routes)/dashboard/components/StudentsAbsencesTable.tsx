/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { StudentAbsence } from "@/features/dashboard/dashboard.types";

interface Props {
  data: StudentAbsence[];
  isLoading: boolean;
  isAdmin: boolean;
}

function getAbsenceRate(student: StudentAbsence) {
  if (!student.total_clases) return 0;

  return Math.round((student.total_ausencias / student.total_clases) * 100);
}

export function StudentsAbsencesTable({ data, isLoading }: Props) {
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    setStartIndex(0);
  }, [data]);

  const visibleItems = data.slice(startIndex, startIndex + 3);

  const handlePrev = () => setStartIndex((p) => Math.max(p - 3, 0));

  const handleNext = () => {
    if (startIndex + 3 < data.length) {
      setStartIndex((p) => p + 3);
    }
  };

  return (
    <Card className="card-modern border-0 overflow-hidden">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle>Ausencia de estudiantes</CardTitle>

          <CardDescription>
            Los 10 estudiantes con mayor cantidad de faltas
          </CardDescription>
        </div>

        {!isLoading && data.length > 3 && (
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              className="size-8 rounded-full"
              onClick={handlePrev}
              disabled={startIndex === 0}
            >
              <ChevronLeft className="size-4" />
            </Button>

            <Button
              size="icon"
              variant="outline"
              className="size-8 rounded-full"
              onClick={handleNext}
              disabled={startIndex + 3 >= data.length}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        )}
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="
                  h-[320px]
                  animate-pulse
                  rounded-[28px]
                  bg-muted
                "
              />
            ))}
          </div>
        ) : (
          <div
            key={visibleItems.map((s) => s.student_id).join("-")}
            className="grid grid-cols-1 gap-4 md:grid-cols-3"
          >
            {visibleItems.map((student) => {
              const absence = getAbsenceRate(student);

              return (
                <div
                  key={student.student_id}
                  className="
                    group
                    relative
                    rounded-[28px]
                    border
                    bg-background/70
                    p-6
                    backdrop-blur
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-xl
                  "
                >
                  {/* CÍRCULO */}
                  <div
                    className="
                      relative
                      mx-auto
                      h-[140px]
                      w-[140px]
                      overflow-hidden
                      rounded-full
                      border
                      bg-muted/30
                    "
                  >
                    <div className="absolute inset-0 bg-muted/40" />

                    <div
                      className="
                        absolute
                        bottom-0
                        left-0
                        w-full
                        transition-all
                        duration-700
                        ease-out
                      "
                      style={{
                        height: `${absence}%`,
                        background:
                          absence < 20
                            ? "linear-gradient(to top, var(--chart-3), var(--chart-2))"
                            : absence < 50
                              ? "linear-gradient(to top, var(--chart-4), var(--chart-3))"
                              : "linear-gradient(to top, var(--chart-5), var(--chart-4))",
                      }}
                    >
                      <svg
                        className="
                          absolute
                          -top-3
                          left-0
                          w-full
                        "
                        viewBox="0 0 144 20"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M0 10 Q 18 0 36 10 T 72 10 T 108 10 T 144 10 V20 H0 Z"
                          fill="rgba(255,255,255,0.25)"
                        />
                      </svg>
                    </div>

                    <div
                      className="
                        absolute
                        inset-0
                        flex
                        flex-col
                        items-center
                        justify-center
                      "
                    >
                      <span className="text-3xl font-bold">{absence}%</span>

                      <span
                        className="
                          text-[10px]
                          uppercase
                          tracking-[0.25em]
                          text-muted-foreground
                        "
                      >
                        ausencias
                      </span>
                    </div>
                  </div>

                  {/* INFO */}
                  <div className="mt-6 text-center">
                    <p className="text-base font-semibold text-foreground">
                      {student.group_name}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {student.student_name}
                    </p>

                    {student.subject_name && (
                      <p className="mt-3 text-xs text-muted-foreground/80">
                        {student.subject_name}
                      </p>
                    )}
                  </div>

                  {/* MINI STATS */}
                  <div className="mt-6 flex items-center justify-center gap-6">
                    <div className="text-center">
                      <p className="text-lg font-semibold">
                        {student.total_ausencias}
                      </p>

                      <p
                        className="
                          text-[10px]
                          uppercase
                          tracking-wide
                          text-muted-foreground
                        "
                      >
                        faltas
                      </p>
                    </div>

                    <div className="h-8 w-px bg-border" />

                    <div className="text-center">
                      <p className="text-lg font-semibold">
                        {student.total_clases}
                      </p>

                      <p
                        className="
                          text-[10px]
                          uppercase
                          tracking-wide
                          text-muted-foreground
                        "
                      >
                        clases
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

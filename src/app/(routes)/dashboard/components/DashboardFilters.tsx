"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import {
  GenericSelect,
  semestersToOptions,
  subjectsToOptions,
  teachersToOptions,
} from "@/components/shared/select";
import { useSemesters, useSubject, useTeacher } from "@/hooks/ApiList";
import { DashboardFilters as Filters } from "@/features/dashboard/dashboard.types";

interface Props {
  filters: Filters;
  onSemesterChange: (v: string) => void;
  onTeacherChange: (v: string) => void;
  onSubjectChange: (v: string) => void;
  onReset: () => void;
}

export function DashboardFilters({
  filters,
  onSemesterChange,
  onTeacherChange,
  onSubjectChange,
  onReset,
}: Props) {
  const { data: semesters, loading: loadingSemesters } = useSemesters("filter");
  const { data: subjects, loading: loadingSubjects } = useSubject();
  const { data: teachers, loading: loadingTeachers } = useTeacher();

  return (
    <div className="flex flex-wrap items-center gap-3 px-4 lg:px-6">
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground">Semestre</span>
        <GenericSelect
          value={filters.semesterId ?? "all"}
          options={[
            { label: "Todos", value: "all" },
            ...semestersToOptions(semesters),
          ]}
          loading={loadingSemesters}
          onSelect={onSemesterChange}
          placeholder="Semestre"
        />
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground">Docente</span>
        <GenericSelect
          value={filters.teacherId ?? "all"}
          options={[
            { label: "Todos", value: "all" },
            ...teachersToOptions(teachers),
          ]}
          loading={loadingTeachers}
          onSelect={onTeacherChange}
          placeholder="Docente"
        />
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground">Asignatura</span>
        <GenericSelect
          value={filters.subjectId ?? "all"}
          options={[
            { label: "Todos", value: "all" },
            ...subjectsToOptions(subjects),
          ]}
          loading={loadingSubjects}
          onSelect={onSubjectChange}
          placeholder="Asignatura"
        />
      </div>

      <Button variant="ghost" size="sm" onClick={onReset} className="mt-4">
        <X className="size-4 mr-1" />
        Limpiar
      </Button>
    </div>
  );
}

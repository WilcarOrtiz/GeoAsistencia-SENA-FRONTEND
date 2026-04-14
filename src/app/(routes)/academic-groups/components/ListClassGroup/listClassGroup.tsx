"use client";

import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/shared/Pagination";
import { Separator } from "@/components/ui/separator";
import { ClassGroupCard } from "../ClassGroupCard/ClassGroupCard";
import { ClassGroup } from "@/features/classGroup/ClassGroup.type";
import {
  GenericSelect,
  semestersToOptions,
  subjectsToOptions,
} from "@/components/shared/select";
import { useSemesters, useSubject } from "@/hooks/ApiList";
import { ClassGroupCardSkeleton } from "@/components/shared/ClassGroupCardSkeleton";

interface Props {
  data: ClassGroup[];

  total: number;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;

  termInput: string;
  semester: string;
  subject: string;

  onSearch: (value: string) => void;
  onSemesterChange: (value: string) => void;
  onSubjectChange: (value: string) => void;
  isLoading: boolean;
}

export function ClassGroupList({
  data,
  total,
  page,
  limit,
  onPageChange,
  termInput,
  semester,
  subject,
  onSearch,
  onSemesterChange,
  onSubjectChange,
  isLoading,
}: Props) {
  const totalPages = Math.ceil(total / limit);
  const { data: semesters, loading: loadingSemesters } = useSemesters("filter");
  const { data: subjects, loading: loadingSubjects } = useSubject();
  return (
    <div>
      {/*  FILTROS */}
      <div className="flex flex-col sm:flex-row sm:items-end gap-3 py-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">Buscar</span>
          <Input
            placeholder="Buscar grupo, docente..."
            value={termInput}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full sm:w-[240px]"
          />
        </div>

        <div className="flex gap-3 flex-col sm:flex-row">
          <div className="flex-1">
            <span className="text-xs text-muted-foreground">Semestre</span>
            <GenericSelect
              options={[
                { label: "Todos", value: "all" },
                ...semestersToOptions(semesters),
              ]}
              loading={loadingSemesters}
              defaultValue={semester || "all"}
              onSelect={(value) => onSemesterChange(value)}
              placeholder="Semestre"
            />
          </div>

          <div className="flex-1">
            <span className="text-xs text-muted-foreground">Asignatura</span>
            <GenericSelect
              options={[
                { label: "Todos", value: "all" },
                ...subjectsToOptions(subjects),
              ]}
              loading={loadingSubjects}
              defaultValue={subject || "all"}
              onSelect={(value) => onSubjectChange(value)}
              placeholder="Asignatura"
            />
          </div>
        </div>
      </div>

      {/* GRID */}

      <Separator />

      <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading && data.length === 0 ? (
          Array.from({ length: 6 }).map((_, i) => (
            <ClassGroupCardSkeleton key={i} />
          ))
        ) : data.length > 0 ? (
          data.map((group) => (
            <ClassGroupCard
              key={group.id}
              id={group.id}
              code={group.code}
              name={group.name}
              subject={group.subject?.name ?? ""}
              semester={group.semester?.name ?? ""}
              teacher={group.teacher?.name ?? ""}
              total_students={group.total_students ?? 0}
              max_students={group.max_students ?? 0}
              is_active={group.is_active}
            />
          ))
        ) : (
          <p className="text-center col-span-full text-muted-foreground">
            No hay resultados
          </p>
        )}
      </div>

      {/* PAGINACIÓN */}
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}

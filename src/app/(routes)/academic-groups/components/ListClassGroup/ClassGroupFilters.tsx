import { Input } from "@/components/ui/input";
import {
  GenericSelect,
  semestersToOptions,
  subjectsToOptions,
} from "@/components/shared/select";
import { useSemesters, useSubject } from "@/hooks/ApiList";

type Props = {
  termInput: string;
  semester: string;
  subject: string;
  onSearch: (value: string) => void;
  onSemesterChange: (value: string) => void;
  onSubjectChange: (value: string) => void;
};

export function ClassGroupFilters({
  termInput,
  semester,
  subject,
  onSearch,
  onSemesterChange,
  onSubjectChange,
}: Props) {
  const { data: semesters, loading: loadingSemesters } = useSemesters("filter");
  const { data: subjects, loading: loadingSubjects } = useSubject();

  return (
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
            onSelect={onSemesterChange}
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
            onSelect={onSubjectChange}
            placeholder="Asignatura"
          />
        </div>
      </div>
    </div>
  );
}

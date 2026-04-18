import * as F from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./FormAcademicGroups.schema";
import {
  GenericSelect,
  semestersToOptions,
  teachersToOptions,
  subjectsToOptions,
} from "@/components/shared/select";
import { useSemesters, useSubject, useTeacher } from "@/hooks/ApiList";

type Props = {
  form: UseFormReturn<FormValues>;
  isEditing: boolean;
};

export function AcademicGroupFields({ form, isEditing }: Props) {
  const { setValue } = form;

  const { data: semesters, loading: loadingSemesters } = useSemesters("select");
  const { data: subjects, loading: loadingSubjects } = useSubject();
  const { data: teachers, loading: loadingTeachers } = useTeacher();

  return (
    <>
      {/* Asignatura */}
      <fieldset disabled={isEditing}>
        <F.FormField
          control={form.control}
          name="subject_id"
          render={({ field }) => (
            <F.FormItem>
              <F.FormLabel>Asignatura</F.FormLabel>
              <F.FormControl>
                <GenericSelect
                  options={subjectsToOptions(subjects)}
                  loading={loadingSubjects}
                  defaultValue={field.value}
                  onSelect={(id) =>
                    setValue("subject_id", id, { shouldValidate: true })
                  }
                  placeholder="Seleccioná una asignatura"
                />
              </F.FormControl>
              <F.FormMessage />
            </F.FormItem>
          )}
        />
      </fieldset>

      {/* Código */}
      <F.FormField
        control={form.control}
        name="code"
        render={({ field }) => (
          <F.FormItem>
            <F.FormLabel>Código</F.FormLabel>
            <F.FormControl>
              <Input placeholder="Ej: elect-108" {...field} />
            </F.FormControl>
            <F.FormDescription>
              Ingrese el código del grupo de clase
            </F.FormDescription>
            <F.FormMessage />
          </F.FormItem>
        )}
      />

      {/* Nombre */}
      <F.FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <F.FormItem>
            <F.FormLabel>Nombre</F.FormLabel>
            <F.FormControl>
              <Input placeholder="Ej: Cloud" {...field} />
            </F.FormControl>
            <F.FormDescription>
              Ingrese el nombre del grupo de clases.
            </F.FormDescription>
            <F.FormMessage />
          </F.FormItem>
        )}
      />

      {/* Máx. estudiantes */}
      <F.FormField
        control={form.control}
        name="max_students"
        render={({ field }) => (
          <F.FormItem>
            <F.FormLabel>Número máximo de estudiantes</F.FormLabel>
            <F.FormControl>
              <Input
                type="number"
                min={1}
                placeholder="Ej: 25"
                value={field.value ?? ""}
                onChange={(e) => field.onChange(e.target.valueAsNumber)}
              />
            </F.FormControl>
            <F.FormDescription className="text-xs text-muted-foreground">
              Define la capacidad máxima del grupo.
            </F.FormDescription>
            <F.FormMessage />
          </F.FormItem>
        )}
      />

      {/* Semestre */}
      <fieldset disabled={isEditing}>
        <F.FormField
          control={form.control}
          name="semester_id"
          render={({ field }) => (
            <F.FormItem>
              <F.FormLabel>Semestre</F.FormLabel>
              <F.FormControl>
                <GenericSelect
                  options={semestersToOptions(semesters)}
                  loading={loadingSemesters}
                  defaultValue={field.value}
                  onSelect={(id) =>
                    setValue("semester_id", id, { shouldValidate: true })
                  }
                  placeholder="Seleccioná un semestre"
                />
              </F.FormControl>
              <F.FormMessage />
            </F.FormItem>
          )}
        />
      </fieldset>

      {/* Docente */}
      <F.FormField
        control={form.control}
        name="teacher_id"
        render={({ field }) => (
          <F.FormItem>
            <F.FormLabel>Docente</F.FormLabel>
            <F.FormControl>
              <GenericSelect
                options={teachersToOptions(teachers)}
                loading={loadingTeachers}
                defaultValue={field.value}
                onSelect={(id) =>
                  setValue("teacher_id", id, { shouldValidate: true })
                }
                placeholder="Seleccioná un docente"
              />
            </F.FormControl>
            <F.FormMessage />
          </F.FormItem>
        )}
      />
    </>
  );
}

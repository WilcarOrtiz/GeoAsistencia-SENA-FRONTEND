"use client";

import * as F from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormClassGroupProps } from "./FormUser.type";
import { useSemesters, useSubject, useTeacher } from "@/hooks/ApiList";
import {
  GenericSelect,
  semestersToOptions,
  teachersToOptions,
  subjectsToOptions,
} from "@/components/shared/select";

const formSchema = z.object({
  code: z.string().min(1, "Requerido").max(10),
  name: z.string().min(3, "Requerido").max(20),
  max_students: z.number().min(1, "Mínimo 1 estudiante"),
  subject_id: z.string().min(1, "Selecciona una asignatura"),
  semester_id: z.string().min(1, "Selecciona un semestre"),
  teacher_id: z.string().min(1, "Selecciona un docente"),
});

type FormValues = z.infer<typeof formSchema>;

export function FormAcademicGroups({ classGroup }: FormClassGroupProps) {
  const { data: semesters, loading: loadingSemesters } = useSemesters();
  const { data: subjects, loading: loadingSubjects } = useSubject();
  const { data: teachers, loading: loadingTeachers } = useTeacher();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: classGroup?.code ?? "",
      name: classGroup?.name ?? "",
      max_students: classGroup?.max_students ?? 1,
      subject_id: classGroup?.subject?.id ?? "",
      semester_id: classGroup?.semester?.id ?? "",
      teacher_id: classGroup?.teacher?.id ?? "",
    },
  });

  const { setValue } = form;

  function onSubmit(values: FormValues) {
    console.log(values);
  }

  return (
    <F.Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card className="border border-muted-foreground/20">
          <CardHeader>
            <CardTitle>Información del grupo</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Semestre */}
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
                      defaultValue={field.value} // ← edición
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

            {/* Asignatura */}
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
          </CardContent>
        </Card>

        <div className="flex justify-center mt-6">
          <Button type="submit" className="w-full sm:w-auto">
            Guardar
          </Button>
        </div>
      </form>
    </F.Form>
  );
}

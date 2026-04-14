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
import { Input } from "@/components/ui/input";
import { WeekDay } from "@/types/weekDay";
import { ClassSchedulesField } from "../ClassSchedulesField/ClassSchedulesField";
import { apiClient } from "@/lib/api/api_client";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ClassGroup } from "@/features/classGroup/ClassGroup.type";

const formSchema = z.object({
  code: z.string().min(2, "Requerido").max(10),
  name: z.string().min(3, "Requerido").max(20),
  max_students: z.number().min(1, "Mínimo 1 estudiante"),
  subject_id: z.string().min(1, "Selecciona una asignatura"),
  semester_id: z.string().min(1, "Selecciona un semestre"),
  teacher_id: z.string().min(1, "Selecciona un docente"),
  schedules: z
    .array(
      z.object({
        days: z.array(z.nativeEnum(WeekDay)).min(1),
        start_time: z.string(),
        end_time: z.string(),
      }),
    )
    .min(1),
});

export type FormValues = z.infer<typeof formSchema>;

export function FormAcademicGroups({ classGroup }: FormClassGroupProps) {
  const router = useRouter();
  const { data: semesters, loading: loadingSemesters } = useSemesters("select");
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
      schedules: [
        {
          days: [],
          start_time: "",
          end_time: "",
        },
      ],
    },
  });

  const { setValue } = form;

  const onSubmit = async (values: FormValues) => {
    try {
      console.log("valores", values);
      const res = await apiClient.post<ClassGroup>("/class-groups", {
        code: values.code.trim(),
        name: values.name.trim(),
        max_students: values.max_students,
        subject_id: values.subject_id,
        semester_id: values.semester_id,
        teacher_id: values.teacher_id,
      });

      const groupId = res.data.id;

      console.log("respuesta: ", groupId);
      if (values.schedules && values.schedules.length > 0) {
        await Promise.all(
          values.schedules.map((schedule) =>
            apiClient.post("/class-days", {
              days: schedule.days,
              start_time: schedule.start_time,
              end_time: schedule.end_time,
              classGroup_id: groupId,
            }),
          ),
        );
      }
      console.log("ejecutado....");
      toast.success("Grupo creado correctamente", { position: "top-center" });
      router.push("/academic-groups");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message ?? "Algo salió mal";
        toast.error(message, { position: "top-center" });
      }
    }
  };

  return (
    <F.Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card className="border border-muted-foreground/20">
          <CardHeader>
            <CardTitle>Información del grupo</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

            {/*codigo*/}

            <F.FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <F.FormItem>
                  <F.FormLabel>code</F.FormLabel>
                  <F.FormControl>
                    <Input placeholder="Ej: elect-108" {...field} />
                  </F.FormControl>
                  <F.FormDescription>
                    Ingrese el codigo del grupo de clase
                  </F.FormDescription>
                  <F.FormMessage />
                </F.FormItem>
              )}
            />
            {/*name*/}
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

            {/*number of student*/}
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
        <ClassSchedulesField form={form} />

        <div className="flex justify-center mt-6">
          <Button type="submit" className="w-full sm:w-auto">
            Guardar
          </Button>
        </div>
      </form>
    </F.Form>
  );
}

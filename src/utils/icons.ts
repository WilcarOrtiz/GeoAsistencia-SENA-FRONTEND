import * as LucideIcons from "lucide-react";
import { LucideProps } from "lucide-react";
import { FC } from "react";

export type IconName = keyof typeof LucideIcons;

export const getIconByName = (name?: string | null): FC<LucideProps> => {
  if (!name) {
    return LucideIcons.HelpCircle;
  }

  const Icon = (LucideIcons as unknown as Record<string, FC<LucideProps>>)[
    name
  ];

  return Icon ?? LucideIcons.HelpCircle;
};

/*"use client";

import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClassSchedulesField } from "../ClassSchedulesField/ClassSchedulesField";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/api/api_client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useClassSchedules } from "../../hook/useClassDays";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const schema = z.object({
  schedules: z.array(
    z.object({
      id: z.string().optional(),
      day: z.number(),
      start_time: z.string(),
      end_time: z.string(),
    }),
  ),
});

type FormValues = z.infer<typeof schema>;

type Props = {
  grupoId: string;
  disabled?: boolean;
};

export function FormClassSchedules({ grupoId, disabled }: Props) {
  const router = useRouter();
  const { schedules, loading } = useClassSchedules(grupoId);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { schedules: [] },
  });

  const { control } = form;
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "schedules",
  });

  const onRemove = async (index: number) => {
    const item = fields[index];

    console.log("ide:", item);
    if (item.id) {
      await apiClient.patch(`/class-days/${item.id}/deactivate`);
    }
    remove(index);
  };

  useEffect(() => {
    if (!loading) {
      replace(
        schedules.length
          ? schedules.map((s) => ({
              id: s.id,
              day: s.day,
              start_time: s.start_time,
              end_time: s.end_time,
            }))
          : [
              {
                day: 1,
                start_time: "",
                end_time: "",
              },
            ],
      );
    }
  }, [loading, schedules, replace]);

  const onSubmit = async (values: FormValues) => {
    console.log("values", values);
    try {
      await Promise.all([
        ...values.schedules.map((schedule) =>
          apiClient.post("/class-days", {
            day: schedule.day,
            start_time: schedule.start_time.slice(0, 5),
            end_time: schedule.end_time.slice(0, 5),
            classGroup_id: grupoId,
          }),
        ),
      ]);

      toast.success("Horarios guardados correctamente");
      router.push("/academic-groups");
    } catch (error) {
      toast.error("Error al guardar horarios");
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {!disabled && (
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-base">Horarios de clase</h3>
          <Button
            type="button"
            onClick={() => append({ day: 0, start_time: "", end_time: "" })}
          >
            Agregar horario
          </Button>
        </div>
      )}

      <fieldset disabled={disabled}>
        <ClassSchedulesField
          form={form}
          fields={fields}
          onRemove={onRemove}
          disabled={disabled}
        />

        {!disabled && (
          <div className="flex justify-center mt-6">
            <Button type="submit" className="w-full sm:w-auto">
              Guardar horarios
            </Button>
          </div>
        )}
      </fieldset>
    </form>
  );
}
*/

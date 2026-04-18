import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiClient } from "@/lib/api/api_client";

import {
  scheduleSchema,
  ScheduleFormValues,
} from "./FormClassSchedules.schema";
import { useClassSchedules } from "../../../hook/useClassDays";

export function useFormClassSchedules(grupoId: string) {
  const router = useRouter();
  const { schedules } = useClassSchedules(grupoId);

  const form = useForm<ScheduleFormValues>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: { schedules: [] },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: "schedules",
  });

  useEffect(() => {
    if (!schedules.length) return;

    replace(
      schedules.map((s) => ({
        id: s.id,
        days: [s.day],
        start_time: s.start_time,
        end_time: s.end_time,
      })),
    );
  }, [schedules, replace]);

  const handleRemove = async (index: number) => {
    const item = form.getValues(`schedules.${index}`);

    if (item?.id) {
      await apiClient.patch(`/class-days/${item.id}/deactivate`);
    }

    remove(index);
  };

  const handleAppend = () => append({ days: [], start_time: "", end_time: "" });

  const onSubmit = async (values: ScheduleFormValues) => {
    try {
      const validSchedules = values.schedules.filter(
        (s) =>
          !s.id &&
          s.days.length > 0 &&
          s.start_time.trim() !== "" &&
          s.end_time.trim() !== "",
      );

      if (!validSchedules.length) {
        toast.error("No hay horarios nuevos válidos");
        return;
      }

      await Promise.all(
        validSchedules.map((s) =>
          apiClient.post("/class-days", {
            days: s.days,
            start_time: s.start_time.slice(0, 5),
            end_time: s.end_time.slice(0, 5),
            classGroup_id: grupoId,
          }),
        ),
      );

      toast.success("Horarios guardados correctamente");
      router.push("/academic-groups");
    } catch (error) {
      console.error("ERROR BACKEND:", error);
      toast.error("Error al guardar horarios");
    }
  };

  return { form, fields, handleAppend, handleRemove, onSubmit };
}

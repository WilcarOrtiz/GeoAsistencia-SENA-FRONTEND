import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiClient } from "@/lib/api/api_client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  scheduleSchema,
  ScheduleFormValues,
} from "./FormClassSchedules.schema";
import { useClassSchedules } from "../../../hook/useClassDays";

export function useFormClassSchedules(grupoId: string) {
  const router = useRouter();
  const queryClient = useQueryClient();
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

  const { mutateAsync: deactivateSchedule } = useMutation({
    mutationFn: (id: string) => apiClient.patch(`/class-days/${id}/deactivate`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["class-days", grupoId] });
    },
  });

  const handleRemove = async (index: number) => {
    const item = form.getValues(`schedules.${index}`);

    if (item?.id) {
      await deactivateSchedule(item.id);
    }

    remove(index);
  };

  const handleAppend = () => append({ days: [], start_time: "", end_time: "" });

  const { mutateAsync: saveSchedules, isPending } = useMutation({
    mutationFn: async (values: ScheduleFormValues) => {
      const validSchedules = values.schedules.filter(
        (s) =>
          !s.id &&
          s.days.length > 0 &&
          s.start_time.trim() !== "" &&
          s.end_time.trim() !== "",
      );

      if (!validSchedules.length) {
        throw new Error("No hay horarios nuevos válidos");
      }

      return Promise.all(
        validSchedules.map((s) =>
          apiClient.post("/class-days", {
            days: s.days,
            start_time: s.start_time.slice(0, 5),
            end_time: s.end_time.slice(0, 5),
            classGroup_id: grupoId,
          }),
        ),
      );
    },

    onSuccess: () => {
      toast.success("Horarios guardados correctamente");
      queryClient.invalidateQueries({ queryKey: ["class-days", grupoId] });
      router.push("/academic-groups");
    },

    onError: (error: Error) => {
      if (error.message === "No hay horarios nuevos válidos") {
        toast.error(error.message);
      } else {
        console.error("ERROR BACKEND:", error);
        toast.error("Error al guardar horarios");
      }
    },
  });

  const onSubmit = (values: ScheduleFormValues) => saveSchedules(values);

  return { form, fields, handleAppend, handleRemove, onSubmit, isPending };
}

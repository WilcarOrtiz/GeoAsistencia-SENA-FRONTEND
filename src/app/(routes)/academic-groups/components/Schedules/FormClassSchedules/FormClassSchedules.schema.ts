import * as z from "zod";

export const scheduleSchema = z.object({
  schedules: z.array(
    z.object({
      id: z.string().optional(),
      days: z.array(z.number()).min(1, "Selecciona al menos un día"),
      start_time: z.string().min(1, "Hora inicio obligatoria"),
      end_time: z.string().min(1, "Hora fin obligatoria"),
    }),
  ),
});

export type ScheduleFormValues = z.infer<typeof scheduleSchema>;

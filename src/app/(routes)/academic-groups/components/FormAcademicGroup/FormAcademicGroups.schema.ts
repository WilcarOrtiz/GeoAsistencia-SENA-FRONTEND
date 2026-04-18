import * as z from "zod";

export const formSchema = z.object({
  code: z.string().min(2, "Requerido").max(10),
  name: z.string().min(3, "Requerido").max(20),
  max_students: z.number().min(1, "Mínimo 1 estudiante"),
  subject_id: z.string().min(1, "Selecciona una asignatura"),
  semester_id: z.string().min(1, "Selecciona un semestre"),
  teacher_id: z.string().min(1, "Selecciona un docente"),
});

export type FormValues = z.infer<typeof formSchema>;

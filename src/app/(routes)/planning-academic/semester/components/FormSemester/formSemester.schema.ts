import * as z from "zod";
import { SEMESTER_STATES } from "@/features/semester/semester.constants";

export const formSchema = z.object({
  name: z.string().min(2),
  startDate: z.date(),
  endDate: z.date(),
  state: z.enum(SEMESTER_STATES),
});

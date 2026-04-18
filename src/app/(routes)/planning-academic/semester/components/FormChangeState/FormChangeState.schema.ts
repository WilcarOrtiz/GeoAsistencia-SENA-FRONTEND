import { Semester, SemesterState } from "@/features/semester/semester.type";
import * as z from "zod";

export const VALID_TRANSITIONS: Record<SemesterState, SemesterState[]> = {
  planned: ["active", "canceled"],
  active: ["finished", "canceled"],
  finished: [],
  canceled: [],
};

export const formSchema = z.object({
  state: z.string().min(1),
});

export type Props = {
  semester: Semester;
  onSuccess?: () => void;
  onClose: () => void;
};

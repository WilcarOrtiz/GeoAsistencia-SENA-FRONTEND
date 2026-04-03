import { SEMESTER_STATE } from "@/features/semester/semester.constants";

export type SemesterState = keyof typeof SEMESTER_STATE;

export interface Semester {
  id: string;
  code: string;
  name: string;
  academic_year: number;
  term: number;
  startDate: string;
  endDate: string;
  state: SemesterState;
}

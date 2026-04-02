import { SEMESTER_STATE } from "@/utils/constants/semester";

export type SemesterState = keyof typeof SEMESTER_STATE;

export type Semester = {
  id: string;
  code: string;
  name: string;
  academic_year: number;
  term: number;
  startDate: string;
  endDate: string;
  state: SemesterState;
};

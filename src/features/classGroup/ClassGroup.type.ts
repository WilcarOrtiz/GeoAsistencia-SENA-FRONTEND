import { SemesterState } from "../semester/semester.type";

export interface ClassGroupOption {
  id: string;
  name: string;
  code: string;
}

export interface ClassGroup {
  id: string;
  code: string;
  name: string;
  academic_year: number;
  max_students: number;
  total_students: number;
  total_sessions: number;
  is_active: boolean;
  created_at: Date;

  subject: {
    id: string;
    name: string;
  };

  semester: {
    id: string;
    name: string;
    state: SemesterState;
  };

  teacher: {
    id: string;
    name: string;
  };
}

export interface ClassDay {
  id: string;
  start_time: string;
  end_time: string;
  day: number;
  is_active: boolean;
}

export interface GroupedSchedule {
  days: number[];
  start_time: string;
  end_time: string;
}

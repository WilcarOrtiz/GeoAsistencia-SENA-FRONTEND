export interface DashboardOverview {
  total_sesiones: number;
  tasa_asistencia: number;
  total_estudiantes: number;
  grupo_critico_nombre: string | null;
  grupo_critico_tasa: number | null;
}

export interface AttendanceDistribution {
  status: "PRESENT" | "ABSENT" | "LATE";
  total: number;
  porcentaje: number;
}

export interface GroupAttendance {
  group_id: string;
  group_name: string;
  subject_name: string;
  porcentaje_asistencia: number;
  porcentaje_inasistencia: number;
  teacher_name?: string;
  semester_name?: string;
  teacher_id?: string;
}

export interface SubjectRanking {
  subject_id: string;
  subject_name: string;
  total_grupos: number;
  porcentaje_asistencia: number;
}

export interface StudentAbsence {
  student_id: string;
  student_name: string;
  group_name: string;
  subject_name?: string;
  total_clases: number;
  total_ausencias: number;
  porcentaje_ausencia: number;
}

export interface DashboardFilters {
  semesterId?: string;
  teacherId?: string;
  subjectId?: string;
  limit?: number;
}

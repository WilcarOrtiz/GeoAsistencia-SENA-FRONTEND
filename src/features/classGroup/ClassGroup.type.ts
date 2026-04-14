export interface ClassGroup {
  id: string;
  code: string;
  name: string;
  academic_year: number;
  max_students: number;
  is_active: boolean;
  created_at: Date;

  subject: {
    id: string;
    name: string;
  };

  semester: {
    id: string;
    name: string;
  };

  teacher: {
    id: string;
    name: string;
  };
}

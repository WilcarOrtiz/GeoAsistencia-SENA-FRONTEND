import { ClassGroup } from "../../../../../features/classGroup/ClassGroup.type";
export type Props = {
  id: string;
  code: string;
  name: string;
  subject: string;
  semester: string;
  teacher: string;
  total_students: number;
  max_students: number;
  is_active: boolean;
  total_sessions: number;
  onEdit: (type: "basic" | "schedule") => void;
  onDetails: () => void;
};

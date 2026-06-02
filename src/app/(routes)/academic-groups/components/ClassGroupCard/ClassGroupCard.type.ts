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
  onEditBasic: (() => void) | undefined;
  onEditSchedule: (() => void) | undefined;
  onDetails: () => void;
};

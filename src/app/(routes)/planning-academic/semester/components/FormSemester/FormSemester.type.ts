import { Semester } from "@/features/semester/semester.type";

export type FormSemesterProps = {
  semester?: Semester;
  onSuccess?: () => void;
  onClose: () => void;
};

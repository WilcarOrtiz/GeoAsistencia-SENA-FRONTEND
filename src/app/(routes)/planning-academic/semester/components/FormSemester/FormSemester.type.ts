import {
  SEMESTER_STATES,
  STATE_LABELS,
} from "@/features/semester/semester.constants";
import { Semester } from "@/features/semester/semester.type";

export const STATUS_OPTIONS = SEMESTER_STATES.map((state) => ({
  value: state,
  label: STATE_LABELS[state],
}));

export type FormSemesterProps = {
  semester?: Semester;
  onSuccess?: () => void;
  onClose: () => void;
};

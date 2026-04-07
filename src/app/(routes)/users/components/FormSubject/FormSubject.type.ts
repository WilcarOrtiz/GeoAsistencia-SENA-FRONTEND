import { Subject } from "@/features/subject/subject.type";

export type FormSubjectProps = {
  subject?: Subject;
  onSuccess?: () => void;
  onClose: () => void;
};

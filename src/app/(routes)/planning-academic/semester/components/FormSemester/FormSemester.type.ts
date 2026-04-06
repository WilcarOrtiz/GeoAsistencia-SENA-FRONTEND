import { Semester } from "@/features/semester/semester.type";
import { Dispatch, SetStateAction } from "react";

export type FormSemesterProps = {
  setOpenModalCreate: Dispatch<SetStateAction<boolean>>;
  semester?: Semester;
  onSuccess?: () => void;
};

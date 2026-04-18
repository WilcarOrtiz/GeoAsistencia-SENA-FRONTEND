import { FieldArrayWithId, UseFormReturn } from "react-hook-form";

export type ScheduleForm = {
  schedules: {
    id?: string;
    days: number[];
    start_time: string;
    end_time: string;
  }[];
};

export type Props = {
  form: UseFormReturn<ScheduleForm>;
  fields: FieldArrayWithId<ScheduleForm, "schedules", "id">[];
  onRemove: (index: number) => void;
  disabled?: boolean;
};

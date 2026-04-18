import { zodResolver } from "@hookform/resolvers/zod";
import { FormSemesterProps } from "./FormSemester.type";
import { useForm } from "react-hook-form";
import { formSchema } from "./formSemester.schema";
import * as z from "zod";
import { apiClient } from "@/lib/api/api_client";
import { toast } from "sonner";
import axios from "axios";

export function useFormSemester(
  semester: FormSemesterProps["semester"],
  onSuccess?: () => void,
  onClose?: () => void,
) {
  const isEditing = !!semester;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: semester?.name ?? "",
      startDate: semester?.startDate ? new Date(semester.startDate) : undefined,
      endDate: semester?.endDate ? new Date(semester.endDate) : undefined,
      state: semester?.state ?? "active",
    },
  });

  const { isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = isEditing
        ? await apiClient.patch(`/semester/${semester!.id}`, {
            name: values.name,
            startDate: values.startDate,
            endDate: values.endDate,
          })
        : await apiClient.post("/semester", values);

      if (res.ok) {
        toast.success(res.message);
        onSuccess?.();
        onClose?.();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message ?? "Opps, algo anda mal";
        toast.error(message, { position: "top-center" });
      }
    }
  };

  return {
    form,
    isEditing,
    isValid,
    onSubmit,
  };
}

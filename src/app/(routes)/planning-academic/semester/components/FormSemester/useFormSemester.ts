import { zodResolver } from "@hookform/resolvers/zod";
import { FormSemesterProps } from "./FormSemester.type";
import { useForm } from "react-hook-form";
import { formSchema } from "./formSemester.schema";
import * as z from "zod";
import { apiClient } from "@/lib/api/api_client";
import { toast } from "sonner";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useFormSemester(
  semester: FormSemesterProps["semester"],
  onSuccess?: () => void,
  onClose?: () => void,
) {
  const isEditing = !!semester;
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: semester?.name ?? "",
      startDate: semester?.startDate ? new Date(semester.startDate) : undefined,
      endDate: semester?.endDate ? new Date(semester.endDate) : undefined,
      state: semester?.state ?? "active",
    },
  });

  const { mutate: submitSemester, isPending } = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) =>
      isEditing
        ? apiClient.patch(`/semester/${semester!.id}`, {
            name: values.name,
            startDate: values.startDate,
            endDate: values.endDate,
          })
        : apiClient.post("/semester", values),

    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["semesters"] });
      onSuccess?.();
      onClose?.();
    },

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Opps, algo anda mal");
      }
    },
  });

  return {
    form,
    isEditing,
    isValid: form.formState.isValid,
    isPending,
    onSubmit: form.handleSubmit((values) => submitSemester(values)),
  };
}

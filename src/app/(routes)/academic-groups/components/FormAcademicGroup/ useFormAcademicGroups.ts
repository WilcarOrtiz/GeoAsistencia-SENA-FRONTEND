import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { formSchema, FormValues } from "./FormAcademicGroups.schema";
import { FormClassGroupProps } from "./FormAcademicGroup.type";
import { apiClient } from "@/lib/api/api_client";
import { ClassGroup } from "@/features/classGroup/ClassGroup.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useFormAcademicGroups(
  classGroup: FormClassGroupProps["classGroup"],
) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [grupoId, setGrupoId] = useState(classGroup?.id ?? "");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: classGroup?.code ?? "",
      name: classGroup?.name ?? "",
      max_students: classGroup?.max_students ?? 1,
      subject_id: classGroup?.subject.id ?? "",
      semester_id: classGroup?.semester.id ?? "",
      teacher_id: classGroup?.teacher.id ?? "",
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (values: FormValues) => {
      const payload = {
        code: values.code.trim(),
        name: values.name.trim(),
        max_students: values.max_students,
        teacher_id: values.teacher_id,
      };

      if (classGroup) {
        return apiClient.patch<ClassGroup>(
          `/class-groups/${classGroup.id}`,
          payload,
        );
      }

      return apiClient.post<ClassGroup>("/class-groups", {
        ...payload,
        semester_id: values.semester_id,
        subject_id: values.subject_id,
      });
    },

    onSuccess: (res) => {
      setGrupoId(res.data.id);
      toast.success(
        classGroup
          ? "Grupo actualizado correctamente"
          : "Grupo creado correctamente",
        { position: "top-center" },
      );
      queryClient.invalidateQueries({ queryKey: ["academic-groups"] });
      if (classGroup) {
        queryClient.invalidateQueries({
          queryKey: ["class-group", classGroup.id],
        });
        router.push("/academic-groups");
      }
    },

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message ?? "Algo salió mal";
        toast.error(message, { position: "top-center" });
      }
    },
  });

  const onSubmit = (values: FormValues) => mutateAsync(values);

  return { form, grupoId, onSubmit, isPending };
}

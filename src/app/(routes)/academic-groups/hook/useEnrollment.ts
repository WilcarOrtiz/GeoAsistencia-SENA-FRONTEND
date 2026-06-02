"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/api_client";
import { toast } from "sonner";

export interface Enrollment {
  id: string;
  full_name: string;
  enrollment_status: string;
  enrolled_at: string;
  attendance_percentage: number;
}

export function useEnrollments(groupId?: string) {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<Enrollment[]>({
    queryKey: ["enrollment", groupId],
    queryFn: () =>
      apiClient
        .get<Enrollment[]>(`/enrollment/${groupId}`)
        .then((res) => res.data),
    enabled: !!groupId,
  });

  const { mutateAsync: removeStudents, isPending: isRemoving } = useMutation({
    mutationFn: (studentIds: string[]) => {
      return apiClient.patch(`/enrollment/remove`, {
        toGroupId: groupId,
        students: studentIds,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrollment", groupId] });
      queryClient.invalidateQueries({ queryKey: ["class-group", groupId] });
      toast.success("Estudiante(s) dados de baja correctamente");
    },
    onError: () => toast.error("Error al dar de baja"),
  });

  const { mutateAsync: transferStudents, isPending: isTransferring } =
    useMutation({
      mutationFn: ({
        studentIds,
        toGroupId,
      }: {
        studentIds: string[];
        toGroupId: string;
      }) =>
        apiClient.post(`/enrollment/move`, {
          students: studentIds,
          fromGroupId: groupId,
          toGroupId,
        }),
      onSuccess: (_, variables) => {
        const { toGroupId } = variables;

        queryClient.invalidateQueries({ queryKey: ["enrollment", groupId] });
        queryClient.invalidateQueries({ queryKey: ["class-group", groupId] });

        queryClient.invalidateQueries({ queryKey: ["enrollment", toGroupId] });
        queryClient.invalidateQueries({ queryKey: ["class-group", toGroupId] });

        toast.success("Estudiantes transferidos correctamente");
      },
      onError: () => toast.error("Error al transferir estudiantes"),
    });

  return {
    students: data ?? [],
    isLoading,
    error,

    removeStudents: async (studentIds: string[]): Promise<void> => {
      await removeStudents(studentIds);
    },
    isRemoving,

    transferStudents: async (
      studentIds: string[],
      toGroupId: string,
    ): Promise<void> => {
      await transferStudents({ studentIds, toGroupId });
    },
    isTransferring,
  };
}

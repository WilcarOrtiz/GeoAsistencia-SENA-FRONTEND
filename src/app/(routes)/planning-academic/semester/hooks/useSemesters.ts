"use client";

import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Semester } from "@/features/semester/semester.type";
import { apiClient } from "@/lib/api/api_client";
import { PaginatedData } from "@/types/api";
import { toast } from "sonner";
import { AxiosError } from "axios";

type ModalType = "create" | "edit" | "changeState" | "delete" | null;
interface ModalState {
  type: ModalType;
  semester?: Semester;
}

export function useSemesters(limit = 10) {
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState<ModalState>({ type: null });
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<PaginatedData<Semester>>({
    queryKey: ["semesters", page, limit],
    queryFn: () =>
      apiClient
        .get<PaginatedData<Semester>>(`/semester?page=${page}&limit=${limit}`)
        .then((res) => res.data),
  });

  const openModal = useCallback((type: ModalType, semester?: Semester) => {
    setModal({ type, semester });
  }, []);

  const closeModal = useCallback(() => setModal({ type: null }), []);

  const { mutate: deleteSemester } = useMutation({
    mutationFn: (id: string) => apiClient.delete(`/semester/${id}`),

    onMutate: async (id) => {
      // 1. Cancelar queries en vuelo
      await queryClient.cancelQueries({ queryKey: ["semesters"] });

      // 2. Snapshot para rollback
      const previous = queryClient.getQueryData(["semesters", page, limit]);

      // 3. Optimistic update
      queryClient.setQueryData(
        ["semesters", page, limit],
        (old: PaginatedData<Semester>) => ({
          ...old,
          data: old.data.filter((item) => item.id !== id),
          total: old.total - 1,
        }),
      );

      return { previous };
    },

    onError: (error, _, context) => {
      // Rollback
      queryClient.setQueryData(["semesters", page, limit], context?.previous);
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message ?? "No se pudo eliminar el semestre",
        );
      }
      closeModal();
    },

    onSuccess: (res) => {
      toast.success("Acción realizada", {
        description: res.message,
      });
      closeModal();
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["semesters"] });
    },
  });

  const handleDelete = useCallback(() => {
    if (modal.semester?.id) deleteSemester(modal.semester.id);
  }, [modal.semester, deleteSemester]);

  const refreshData = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["semesters"] });
  }, [queryClient]);

  return {
    semesters: data?.data ?? [],
    total: data?.total ?? 0,
    isLoading,
    page,
    limit,
    setPage,
    modal,
    openModal,
    closeModal,
    handleDelete,
    refreshData,
  };
}

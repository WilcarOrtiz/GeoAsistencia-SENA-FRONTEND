"use client";
import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/api_client";
import { PaginatedData } from "@/types/api";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { Subject } from "@/features/subject/subject.type";

type ModalType = "create" | "edit" | "changeState" | "delete" | null;
interface ModalState {
  type: ModalType;
  subject?: Subject;
}

export function useSubjects(limit = 10) {
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState<ModalState>({ type: null });
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<PaginatedData<Subject>>({
    queryKey: ["subjects", page, limit],
    queryFn: () =>
      apiClient
        .get<PaginatedData<Subject>>(`/subjects?page=${page}&limit=${limit}`)
        .then((res) => res.data),
  });

  const openModal = useCallback((type: ModalType, subject?: Subject) => {
    setModal({ type, subject });
  }, []);

  const closeModal = useCallback(() => setModal({ type: null }), []);

  const { mutate: deleteSubject } = useMutation({
    mutationFn: (id: string) => apiClient.delete(`/subjects/${id}`),

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["subjects"] });
      const previous = queryClient.getQueryData(["subjects", page, limit]);
      queryClient.setQueryData(
        ["subjects", page, limit],
        (old: PaginatedData<Subject>) => ({
          ...old,
          data: old.data.filter((item) => item.id !== id),
          total: old.total - 1,
        }),
      );
      return { previous };
    },

    onError: (error, _, context) => {
      queryClient.setQueryData(["subjects", page, limit], context?.previous);
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message ?? "No se pudo eliminar la materia",
        );
      }
      closeModal();
    },

    onSuccess: (res) => {
      toast.success("Acción realizada", {
        description: res.message,
        position: "top-center",
      });
      closeModal();
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
  });

  const handleDelete = useCallback(() => {
    if (modal.subject?.id) deleteSubject(modal.subject.id);
  }, [modal.subject, deleteSubject]);

  const refreshData = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["subjects"] });
  }, [queryClient]);

  return {
    subjects: data?.data ?? [],
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

"use client";
import { useState, useCallback, useMemo } from "react";
import { apiClient } from "@/lib/api/api_client";
import { PaginatedData } from "@/types/api";
import { toast } from "sonner";
import { AxiosError } from "axios";
import useSWR from "swr";
import { Subject } from "@/features/subject/subject.type";

type ModalType = "create" | "edit" | "changeState" | "delete" | null;

interface ModalState {
  type: ModalType;
  subject?: Subject;
}

const fetcher = async (url: string) => {
  const { data } = await apiClient.get<PaginatedData<Subject>>(url);
  return data;
};

export function useSubjects(limit = 10) {
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState<ModalState>({ type: null });

  const { data, isLoading, mutate } = useSWR(
    `/subjects?page=${page}&limit=${limit}`,
    fetcher,
  );

  const openModal = useCallback((type: ModalType, subject?: Subject) => {
    setModal({ type, subject });
  }, []);

  const closeModal = useCallback(() => {
    setModal({ type: null });
  }, []);

  const handleDelete = useCallback(async () => {
    if (!modal.subject?.id) return;

    const id = modal.subject.id;

    // 🔥 1. Actualización optimista (INMEDIATA)
    mutate((currentData) => {
      if (!currentData) return currentData;

      return {
        ...currentData,
        data: currentData.data.filter((item) => item.id !== id),
        total: currentData.total - 1,
      };
    }, false); // ❗ sin refetch

    try {
      const res = await apiClient.delete(`/subjects/${id}`);

      toast.success("Acción realizada", {
        description: res.message,
        position: "top-center",
      });

      closeModal();
    } catch (error) {
      // 🔥 2. rollback si falla
      mutate(); // aquí sí refetch

      closeModal();

      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message ?? "No se pudo eliminar el semestre",
        );
      }
    }
  }, [modal.subject, mutate, closeModal]);

  const refreshData = useCallback(() => {
    mutate();
  }, [mutate]);

  return useMemo(
    () => ({
      // Data
      subjects: data?.data ?? [],
      total: data?.total ?? 0,
      isLoading,

      // Pagination
      page,
      limit,
      setPage,

      // Modal state
      modal,
      openModal,
      closeModal,

      // Actions
      handleDelete,
      refreshData,
    }),
    [
      data,
      isLoading,
      page,
      limit,
      modal,
      openModal,
      closeModal,
      handleDelete,
      refreshData,
    ],
  );
}

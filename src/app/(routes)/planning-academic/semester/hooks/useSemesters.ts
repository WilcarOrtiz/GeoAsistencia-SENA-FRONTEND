"use client";

import { useState, useCallback, useMemo } from "react";
import { Semester } from "@/features/semester/semester.type";
import { apiClient } from "@/lib/api/api_client";
import { PaginatedData } from "@/types/api";
import { toast } from "sonner";
import { AxiosError } from "axios";
import useSWR from "swr";

type ModalType = "create" | "edit" | "changeState" | "delete" | null;

interface ModalState {
  type: ModalType;
  semester?: Semester;
}

const fetcher = async (url: string) => {
  const { data } = await apiClient.get<PaginatedData<Semester>>(url);
  return data;
};

export function useSemesters(limit = 10) {
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState<ModalState>({ type: null });

  const { data, isLoading, mutate } = useSWR(
    `/semester?page=${page}&limit=${limit}`,
    fetcher
  );

  const openModal = useCallback((type: ModalType, semester?: Semester) => {
    setModal({ type, semester });
  }, []);

  const closeModal = useCallback(() => {
    setModal({ type: null });
  }, []);

  const handleDelete = useCallback(async () => {
    if (!modal.semester?.id) return;

    try {
      const res = await apiClient.delete(`/semester/${modal.semester.id}`);
      toast.success("Accion Realizada", {
        description: res.message,
        position: "top-center",
      });
      closeModal();
      mutate();
    } catch (error) {
      closeModal();
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message ?? "No se pudo eliminar el semestre"
        );
      }
    }
  }, [modal.semester?.id, closeModal, mutate]);

  const refreshData = useCallback(() => {
    mutate();
  }, [mutate]);

  return useMemo(
    () => ({
      // Data
      semesters: data?.data ?? [],
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
    [data, isLoading, page, limit, modal, openModal, closeModal, handleDelete, refreshData]
  );
}

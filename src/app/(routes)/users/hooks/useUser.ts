"use client";

import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api/api_client";
import { PaginatedData } from "@/types/api";
import useSWR from "swr";
import { User } from "@/features/User/user.type";

const fetcher = async (url: string) => {
  const { data } = await apiClient.get<PaginatedData<User>>(url);
  return data;
};

export function useUsers(limit = 10) {
  const router = useRouter();
  const [page, setPage] = useState(1);

  const { data, isLoading, mutate } = useSWR(
    `/user?page=${page}&limit=${limit}`,
    fetcher,
  );

  const handleCreate = useCallback(() => {
    router.push("/users/create");
  }, [router]);

  const handleEdit = useCallback(
    (user: User) => {
      router.push(`/user/${user.auth_id}`);
    },
    [router],
  );

  const handleChangeState = useCallback(
    async (user: User) => {
      try {
        const res = user.is_active
          ? await apiClient.patch(`/user/${user.auth_id}/deactivate`)
          : await apiClient.patch(`/user/${user.auth_id}/activate`);

        if (res.ok) {
          await mutate();
        }
      } catch (error) {
        console.error("Error cambiando estado:", error);
      }
    },
    [mutate],
  );

  return useMemo(
    () => ({
      users: data?.data ?? [],
      total: data?.total ?? 0,
      isLoading,
      page,
      limit,
      setPage,
      handleCreate,
      handleEdit,
      handleChangeState,
    }),
    [data, isLoading, page, limit, handleCreate, handleEdit, handleChangeState],
  );
}

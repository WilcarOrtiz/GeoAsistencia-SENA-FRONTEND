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

  const { data, isLoading } = useSWR(
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
    }),
    [data, isLoading, page, limit, handleCreate, handleEdit],
  );
}
